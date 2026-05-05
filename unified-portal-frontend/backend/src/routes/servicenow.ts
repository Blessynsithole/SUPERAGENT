import express from 'express';
import { prisma } from '../lib/prisma.js';
import { authenticateToken } from './auth.js';
import { serviceNow } from '../lib/servicenow.js';

const router = express.Router();

/**
 * ServiceNow API Endpoints
 * For manual sync operations and webhook receivers
 */

// Get ServiceNow integration status
router.get('/status', authenticateToken, async (req, res) => {
  res.json({
    enabled: serviceNow.isEnabled(),
    instance: process.env.SERVICENOW_URL || 'Not configured'
  });
});

// Manual sync ticket to ServiceNow
router.post('/sync/:ticketId', authenticateToken, async (req, res) => {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: req.params.ticketId },
      include: { createdBy: true, assignedTo: true }
    });

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    let serviceNowId: string | null;

    if (ticket.serviceNowId) {
      const success = await serviceNow.updateIncident(ticket.serviceNowId, ticket);
      if (!success) {
        return res.status(500).json({ error: 'Failed to sync ticket to ServiceNow' });
      }
      serviceNowId = ticket.serviceNowId;
    } else {
      serviceNowId = await serviceNow.createIncident(ticket);
      if (!serviceNowId) {
        return res.status(500).json({ error: 'Failed to create ticket in ServiceNow' });
      }
    }

    // Update sync status
    await prisma.ticket.update({
      where: { id: ticket.id },
      data: {
        serviceNowId,
        serviceNowSyncStatus: 'SYNCED',
        serviceNowLastSync: new Date()
      }
    });

    res.json({
      success: true,
      serviceNowId,
      message: 'Ticket synced successfully to ServiceNow'
    });

  } catch (error) {
    console.error('ServiceNow manual sync failed:', error);
    res.status(500).json({ error: 'Sync operation failed' });
  }
});

// Pull incident from ServiceNow
router.get('/pull/:sysId', authenticateToken, async (req, res) => {
  try {
    const incident = await serviceNow.getIncident(req.params.sysId);
    
    if (!incident) {
      return res.status(404).json({ error: 'Incident not found in ServiceNow' });
    }

    res.json(incident);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch incident from ServiceNow' });
  }
});

// ServiceNow Webhook Receiver (for incoming updates)
router.post('/webhook', async (req, res) => {
  try {
    const { incident_id, external_ticket_id, status, comments } = req.body;

    // Verify webhook signature should be implemented here in production

    if (external_ticket_id) {
      // Find local ticket and update it with ServiceNow changes
      await prisma.ticket.update({
        where: { id: external_ticket_id },
        data: {
          serviceNowLastSync: new Date()
        }
      });
    }

    res.json({ received: true });
  } catch (error) {
    console.error('ServiceNow webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export { router as serviceNowRoutes };
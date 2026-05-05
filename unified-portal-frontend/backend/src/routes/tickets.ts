import express from 'express'
import { prisma } from '../lib/prisma.js'
import { authenticateToken } from './auth.js'
import { serviceNow } from '../lib/servicenow.js'

const router = express.Router()

// Initialize default tickets
async function initializeDefaultTickets() {
  const ticketCount = await prisma.ticket.count()
  if (ticketCount === 0) {
    const users = await prisma.user.findMany({ take: 3 })

    if (users.length >= 3) {
      const defaultTickets = [
        {
          title: 'Internet connection issue',
          description: 'Customer reports slow internet speeds',
          status: 'OPEN' as const,
          priority: 'MEDIUM' as const,
          createdById: users[0].id
        },
        {
          title: 'Billing discrepancy',
          description: 'Customer charged twice for the same month',
          status: 'IN_PROGRESS' as const,
          priority: 'HIGH' as const,
          assignedToId: users[0].id,
          createdById: users[1].id
        },
        {
          title: 'Router setup assistance',
          description: 'New customer needs help configuring router',
          status: 'RESOLVED' as const,
          priority: 'LOW' as const,
          assignedToId: users[0].id,
          createdById: users[0].id
        }
      ]

      for (const ticketData of defaultTickets) {
        await prisma.ticket.create({ data: ticketData })
      }
      console.log('Created default tickets')
    }
  }
}

// Initialize tickets on module load
initializeDefaultTickets().catch(console.error)

// Get all tickets
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true }
        },
        createdBy: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    res.json(tickets)
  } catch (error) {
    console.error('Get tickets error:', error)
    res.status(500).json({ error: 'Failed to fetch tickets' })
  }
})

// Get ticket by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: req.params.id },
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true }
        },
        createdBy: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' })
    }

    res.json(ticket)
  } catch (error) {
    console.error('Get ticket error:', error)
    res.status(500).json({ error: 'Failed to fetch ticket' })
  }
})

// Create ticket
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, priority, category } = req.body
    const user = (req as any).user

    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        priority: priority?.toUpperCase() || 'MEDIUM',
        status: 'OPEN',
        createdById: user.id
      },
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true }
        },
        createdBy: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    // Auto sync to ServiceNow
    try {
      const serviceNowId = await serviceNow.createIncident(ticket);
      
      if (serviceNowId) {
        await prisma.ticket.update({
          where: { id: ticket.id },
          data: {
            serviceNowId,
            serviceNowSyncStatus: 'SYNCED',
            serviceNowLastSync: new Date()
          }
        });
        ticket.serviceNowId = serviceNowId;
        ticket.serviceNowSyncStatus = 'SYNCED';
      }
    } catch (syncError) {
      console.error('ServiceNow sync failed (non-blocking):', syncError);
      // Mark sync status without failing the ticket creation
      await prisma.ticket.update({
        where: { id: ticket.id },
        data: {
          serviceNowSyncStatus: 'FAILED',
          serviceNowLastSync: new Date()
        }
      }).catch(() => {});
    }

    res.status(201).json(ticket)
  } catch (error) {
    console.error('Create ticket error:', error)
    res.status(500).json({ error: 'Failed to create ticket' })
  }
})

// Update ticket
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const updates = req.body

    // Convert status and priority to uppercase if provided
    if (updates.status) updates.status = updates.status.toUpperCase()
    if (updates.priority) updates.priority = updates.priority.toUpperCase()

    const ticket = await prisma.ticket.update({
      where: { id: req.params.id },
      data: updates,
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true }
        },
        createdBy: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    // Auto sync updates to ServiceNow
    try {
      if (ticket.serviceNowId) {
        const syncSuccess = await serviceNow.updateIncident(ticket.serviceNowId, updates);
        
        if (syncSuccess) {
          await prisma.ticket.update({
            where: { id: ticket.id },
            data: {
              serviceNowSyncStatus: 'SYNCED',
              serviceNowLastSync: new Date()
            }
          });
        }
      }
    } catch (syncError) {
      console.error('ServiceNow update sync failed:', syncError);
    }

    res.json(ticket)
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Ticket not found' })
    }
    console.error('Update ticket error:', error)
    res.status(500).json({ error: 'Failed to update ticket' })
  }
})

// Delete ticket
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.ticket.delete({
      where: { id: req.params.id }
    })
    res.status(204).send()
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Ticket not found' })
    }
    console.error('Delete ticket error:', error)
    res.status(500).json({ error: 'Failed to delete ticket' })
  }
})

export { router as ticketRoutes }
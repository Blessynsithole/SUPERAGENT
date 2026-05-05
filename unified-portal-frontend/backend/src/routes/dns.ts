import express from 'express'
import { prisma } from '../lib/prisma.js'
import { authenticateToken } from './auth.js'

const router = express.Router()

// Initialize default DNS records
async function initializeDefaultDnsRecords() {
  const dnsCount = await prisma.dnsRecord.count()
  if (dnsCount === 0) {
    const defaultRecords = [
      {
        domain: 'liquidhome.co.zw',
        type: 'A' as const,
        value: '192.168.1.1',
        ttl: 3600,
        status: 'ACTIVE' as const
      },
      {
        domain: 'mail.liquidhome.co.zw',
        type: 'MX' as const,
        value: 'mail.liquidhome.co.zw',
        ttl: 3600,
        status: 'ACTIVE' as const
      }
    ]

    for (const record of defaultRecords) {
      await prisma.dnsRecord.create({ data: record })
    }
    console.log('Created default DNS records')
  }
}

// Initialize DNS records on module load
initializeDefaultDnsRecords().catch(console.error)

// Get DNS records
router.get('/', authenticateToken, async (req, res) => {
  try {
    const records = await prisma.dnsRecord.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(records)
  } catch (error) {
    console.error('Get DNS records error:', error)
    res.status(500).json({ error: 'Failed to fetch DNS records' })
  }
})

// Get DNS record by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const record = await prisma.dnsRecord.findUnique({
      where: { id: req.params.id }
    })

    if (!record) {
      return res.status(404).json({ error: 'DNS record not found' })
    }

    res.json(record)
  } catch (error) {
    console.error('Get DNS record error:', error)
    res.status(500).json({ error: 'Failed to fetch DNS record' })
  }
})

// Create DNS record
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { domain, type, value, ttl } = req.body

    const record = await prisma.dnsRecord.create({
      data: {
        domain,
        type: type.toUpperCase(),
        value,
        ttl: ttl || 3600,
        status: 'ACTIVE'
      }
    })

    res.status(201).json(record)
  } catch (error) {
    console.error('Create DNS record error:', error)
    res.status(500).json({ error: 'Failed to create DNS record' })
  }
})

// Update DNS record
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const updates = req.body

    // Convert type to uppercase if provided
    if (updates.type) updates.type = updates.type.toUpperCase()

    const record = await prisma.dnsRecord.update({
      where: { id: req.params.id },
      data: updates
    })

    res.json(record)
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'DNS record not found' })
    }
    console.error('Update DNS record error:', error)
    res.status(500).json({ error: 'Failed to update DNS record' })
  }
})

// Delete DNS record
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.dnsRecord.delete({
      where: { id: req.params.id }
    })
    res.status(204).send()
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'DNS record not found' })
    }
    console.error('Delete DNS record error:', error)
    res.status(500).json({ error: 'Failed to delete DNS record' })
  }
})

export { router as dnsRoutes }
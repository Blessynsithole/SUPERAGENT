export const TICKET_STATUSES = {
  OPEN: 'open',
  IN_PROGRESS: 'in-progress',
  RESOLVED: 'resolved',
  ESCALATED: 'escalated',
} as const

export const TICKET_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const

export const PRODUCTS = {
  WIBRONIX: 'wibronix',
  GPON: 'gpon',
  LTE_BOX: 'lte-box',
  ROUTER: 'router',
} as const

export const USER_ROLES = {
  AGENT: 'agent',
  SUPERVISOR: 'supervisor',
  ADMIN: 'admin',
} as const

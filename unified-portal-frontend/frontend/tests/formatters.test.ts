import { describe, it, expect } from 'vitest'
import { formatDate, formatDateTime, timeAgo } from '@utils/formatters'

describe('formatters', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-15')
    const formatted = formatDate(date, 'MMM dd, yyyy')
    expect(formatted).toBe('Jan 15, 2024')
  })

  it('should format date and time correctly', () => {
    const date = new Date('2024-01-15T14:30:00')
    const formatted = formatDateTime(date)
    expect(formatted).toContain('2024')
  })
})

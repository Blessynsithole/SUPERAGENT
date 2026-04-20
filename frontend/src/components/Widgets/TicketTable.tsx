import { formatDateTime } from '@utils/formatters'

interface Ticket {
  id: string
  title: string
  description: string
  status: string
  priority: string
  assignedTo: string | null
  createdAt: string
  updatedAt: string
}

interface TicketTableProps {
  tickets: Ticket[]
}

const statusColors: Record<string, string> = {
  open: 'bg-blue-50 text-blue-700',
  'in-progress': 'bg-amber-50 text-amber-700',
  resolved: 'bg-green-50 text-green-700',
  escalated: 'bg-red-50 text-red-700',
}

const priorityColors: Record<string, string> = {
  low: 'bg-surface-50 text-surface-700',
  medium: 'bg-amber-50 text-amber-700',
  high: 'bg-orange-50 text-orange-700',
  critical: 'bg-red-50 text-red-700',
}

export default function TicketTable({ tickets }: TicketTableProps) {
  if (tickets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-surface-600">No tickets found</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-surface-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-50 border-b border-surface-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-surface-700">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-surface-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-surface-700">Priority</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-surface-700">Assigned To</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-surface-700">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-200">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-surface-50 transition-colors">
                <td className="px-6 py-3 text-sm text-surface-900 font-medium">{ticket.title}</td>
                <td className="px-6 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColors[ticket.priority]}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm text-surface-600">{ticket.assignedTo || '—'}</td>
                <td className="px-6 py-3 text-sm text-surface-600">{formatDateTime(ticket.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTickets, setLoading, setError } from '@state/ticket.slice'
import type { RootState, AppDispatch } from '@state/store'
import { ticketService } from '@services/ticket.service'
import { Clock, AlertCircle, CheckCircle, Play } from 'lucide-react'

const statusConfig = {
  open: { label: 'Open', icon: Clock, color: 'bg-blue-100 text-blue-800' },
  'in-progress': { label: 'In Progress', icon: Play, color: 'bg-yellow-100 text-yellow-800' },
  resolved: { label: 'Resolved', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
  escalated: { label: 'Escalated', icon: AlertCircle, color: 'bg-red-100 text-red-800' },
}

export default function TaskBoard() {
  const dispatch = useDispatch<AppDispatch>()
  const { tickets, loading, error } = useSelector((state: RootState) => state.ticket)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        dispatch(setLoading(true))
        const response = await ticketService.getAll()
        dispatch(setTickets(response.data))
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch tickets'))
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchTickets()
  }, [dispatch])

  const ticketsByStatus = tickets.reduce((acc, ticket) => {
    if (!acc[ticket.status]) acc[ticket.status] = []
    acc[ticket.status].push(ticket)
    return acc
  }, {} as Record<string, typeof tickets>)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-surface-900 mb-8">Task Board</h1>
          <div className="text-center">Loading tickets...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-surface-900 mb-8">Task Board</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(statusConfig).map(([status, config]) => {
            const Icon = config.icon
            const ticketsForStatus = ticketsByStatus[status] || []

            return (
              <div key={status} className="bg-white rounded-lg shadow-sm border border-surface-200">
                <div className="p-4 border-b border-surface-200">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5" />
                    <h3 className="font-semibold text-surface-900">{config.label}</h3>
                    <span className="ml-auto bg-surface-100 text-surface-600 px-2 py-1 rounded-full text-sm">
                      {ticketsForStatus.length}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {ticketsForStatus.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="bg-surface-50 rounded-lg p-3 border border-surface-200 hover:shadow-sm transition-shadow cursor-pointer"
                    >
                      <h4 className="font-medium text-surface-900 text-sm mb-1">{ticket.title}</h4>
                      <p className="text-surface-600 text-xs mb-2 line-clamp-2">{ticket.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.priority === 'critical' ? 'bg-red-100 text-red-800' :
                          ticket.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {ticket.priority}
                        </span>
                        <span className="text-xs text-surface-500">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}

                  {ticketsForStatus.length === 0 && (
                    <div className="text-center text-surface-400 py-8">
                      No tickets in {config.label.toLowerCase()}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

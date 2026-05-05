import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTickets, setLoading } from '@state/ticket.slice'
import type { RootState, AppDispatch } from '@state/store'
import { ticketService } from '@services/ticket.service'
import TicketTable from '@components/Widgets/TicketTable'

export default function Records() {
  const dispatch = useDispatch<AppDispatch>()
  const { tickets, loading, error } = useSelector((state: RootState) => state.ticket)

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        dispatch(setLoading(true))
        const response = await ticketService.getAll()
        dispatch(setTickets(response.data))
      } catch (err) {
        console.error('Failed to fetch records:', err)
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchRecords()
  }, [dispatch])

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-surface-900 mb-8">Records</h1>
        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-4">
            {error}
          </div>
        )}
        <TicketTable tickets={tickets} />
      </div>
    </div>
  )
}

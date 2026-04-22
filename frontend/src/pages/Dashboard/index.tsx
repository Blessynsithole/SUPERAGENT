import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTickets, setLoading, setError } from '@state/ticket.slice'
import type { RootState, AppDispatch } from '@state/store'
import { ticketService } from '@services/ticket.service'
import { Phone, CheckCircle, Clock, TrendingUp } from 'lucide-react'
import StatCard from '@components/Widgets/StatCard'
import AIAssistant from '@components/Widgets/AIAssistant'
import ProductSelector from '@components/Troubleshooter/ProductSelector'

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const { error } = useSelector((state: RootState) => state.ticket)
  const [stats, setStats] = useState({
    callsToday: 0,
    resolvedToday: 0,
    avgHandleTime: '0m',
    escalations: 0,
  })

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        dispatch(setLoading(true))
        const response = await ticketService.getAll()
        dispatch(setTickets(response.data))
        
        // Calculate stats
        const resolved = response.data.filter(t => t.status === 'resolved').length
        setStats({
          callsToday: response.data.length,
          resolvedToday: resolved,
          avgHandleTime: '15m',
          escalations: response.data.filter(t => t.status === 'escalated').length,
        })
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch tickets'))
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchTickets()
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-surface-900">Dashboard</h1>
          <p className="text-surface-600 mt-2">Welcome back! Here's your daily performance overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Calls Today"
            value={stats.callsToday}
            icon={Phone}
            color="blue"
          />
          <StatCard
            title="Resolved Today"
            value={stats.resolvedToday}
            icon={CheckCircle}
            color="green"
          />
          <StatCard
            title="Avg Handle Time"
            value={stats.avgHandleTime}
            icon={Clock}
            color="amber"
          />
          <StatCard
            title="Escalations"
            value={stats.escalations}
            icon={TrendingUp}
            color="red"
          />
        </div>

        {/* AI Assistant */}
        <div className="mb-8">
          <AIAssistant />
        </div>

        {/* Product Selector */}
        <div>
          <ProductSelector />
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

import { useState } from 'react'
import { MessageCircle, Send } from 'lucide-react'
import { aiService } from '@services/ai.service'

export default function AIAssistant() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    if (!query.trim()) return

    try {
      setLoading(true)
      const result = await aiService.askQuestion(query)
      setResponse(result.data.answer)
    } catch (err) {
      setResponse('Sorry, I encountered an error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-surface-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <MessageCircle className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-surface-900">AI Scenario Assistant</h2>
          <p className="text-sm text-surface-600">Ask for instant guidance on complex scenarios</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
          placeholder="Describe your scenario..."
          className="flex-1 px-4 py-2 rounded-lg border border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {response && (
        <div className="p-4 bg-surface-50 rounded-lg border border-surface-200 text-surface-700">
          {response}
        </div>
      )}
    </div>
  )
}

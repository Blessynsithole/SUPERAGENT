import client from './api-client'

export interface AIResponse {
  answer: string
  sources: string[]
  confidence: number
}

export const aiService = {
  askQuestion: (query: string) =>
    client.post<AIResponse>('/ai/query', { query }),
  getScenarios: () => client.get<any[]>('/ai/scenarios'),
}

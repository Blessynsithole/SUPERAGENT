import client from './api-client'

export interface Ticket {
  id: string
  title: string
  description: string
  status: string
  priority: string
  assignedTo: string | null
  createdAt: string
  updatedAt: string
}

export const ticketService = {
  getAll: () => client.get<Ticket[]>('/tickets'),
  getById: (id: string) => client.get<Ticket>(`/tickets/${id}`),
  create: (data: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) =>
    client.post<Ticket>('/tickets', data),
  update: (id: string, data: Partial<Ticket>) =>
    client.patch<Ticket>(`/tickets/${id}`, data),
  delete: (id: string) => client.delete(`/tickets/${id}`),
}

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Ticket {
  id: string
  title: string
  description: string
  status: 'open' | 'in-progress' | 'resolved' | 'escalated'
  priority: 'low' | 'medium' | 'high' | 'critical'
  assignedTo: string | null
  createdAt: string
  updatedAt: string
}

interface TicketState {
  tickets: Ticket[]
  currentTicket: Ticket | null
  loading: boolean
  error: string | null
}

const initialState: TicketState = {
  tickets: [],
  currentTicket: null,
  loading: false,
  error: null,
}

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = action.payload
    },
    setCurrentTicket: (state, action: PayloadAction<Ticket | null>) => {
      state.currentTicket = action.payload
    },
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets.push(action.payload)
    },
    updateTicket: (state, action: PayloadAction<Ticket>) => {
      const index = state.tickets.findIndex((t) => t.id === action.payload.id)
      if (index !== -1) {
        state.tickets[index] = action.payload
      }
      if (state.currentTicket?.id === action.payload.id) {
        state.currentTicket = action.payload
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  setTickets,
  setCurrentTicket,
  addTicket,
  updateTicket,
  setLoading,
  setError,
} = ticketSlice.actions
export default ticketSlice.reducer

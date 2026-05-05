import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from './session.slice'
import ticketReducer from './ticket.slice'

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    ticket: ticketReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

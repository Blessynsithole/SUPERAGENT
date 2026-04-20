import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SessionState {
  isAuthenticated: boolean
  user: {
    id: string
    name: string
    email: string
    role: 'agent' | 'supervisor' | 'admin'
  } | null
  token: string | null
}

const initialState: SessionState = {
  isAuthenticated: false,
  user: null,
  token: null,
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SessionState['user']>) => {
      state.user = action.payload
      state.isAuthenticated = !!action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
    },
  },
})

export const { setUser, setToken, logout } = sessionSlice.actions
export default sessionSlice.reducer

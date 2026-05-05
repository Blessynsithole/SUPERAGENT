import client from './api-client'

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  user: {
    id: string
    name: string
    email: string
    role: 'agent' | 'supervisor' | 'admin'
  }
  token: string
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await client.post<AuthResponse>('/auth/login', credentials)
    localStorage.setItem('auth_token', response.data.token)
    return response.data
  },

  logout: async (): Promise<void> => {
    await client.post('/auth/logout')
    localStorage.removeItem('auth_token')
  },

  getCurrentUser: async (): Promise<AuthResponse['user']> => {
    const response = await client.get<AuthResponse['user']>('/auth/me')
    return response.data
  },

  refreshToken: async (): Promise<{ token: string }> => {
    const response = await client.post<{ token: string }>('/auth/refresh')
    localStorage.setItem('auth_token', response.data.token)
    return response.data
  },
}
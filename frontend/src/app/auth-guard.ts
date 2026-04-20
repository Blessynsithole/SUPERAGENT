import { Navigate } from 'react-router-dom'
import type { ComponentType } from 'react'

interface PrivateRouteProps {
  component: ComponentType<any>
  isAuthenticated: boolean
}

export default function PrivateRoute({
  component: Component,
  isAuthenticated,
}: PrivateRouteProps) {
  return isAuthenticated ? <Component /> : <Navigate to="/" replace />
}

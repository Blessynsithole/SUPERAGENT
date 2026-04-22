import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@state/store'

// Pages
import Dashboard from '@pages/Dashboard'
import Records from '@pages/Records'
import TaskBoard from '@pages/TaskBoard'
import Admin from '@pages/Admin'

// Auth Guard
import PrivateRoute from './auth-guard'

export function AppRouter() {
  const { isAuthenticated } = useSelector((state: RootState) => state.session)

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={<PrivateRoute component={Dashboard} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/records"
          element={<PrivateRoute component={Records} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/taskboard"
          element={<PrivateRoute component={TaskBoard} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/admin"
          element={<PrivateRoute component={Admin} isAuthenticated={isAuthenticated} />}
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}

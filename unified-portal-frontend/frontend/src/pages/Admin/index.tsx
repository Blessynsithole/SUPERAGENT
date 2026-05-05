import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@state/store'
import { Users, Shield, Activity } from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  role: 'agent' | 'supervisor' | 'admin'
  status: 'active' | 'inactive'
  lastLogin?: string
}

export default function Admin() {
  const { user: currentUser } = useSelector((state: RootState) => state.session)
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Agent Smith',
      email: 'agent@liquidhome.co.zw',
      role: 'agent',
      status: 'active',
      lastLogin: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      name: 'Supervisor Johnson',
      email: 'supervisor@liquidhome.co.zw',
      role: 'supervisor',
      status: 'active',
      lastLogin: '2024-01-15T09:15:00Z',
    },
    {
      id: '3',
      name: 'Admin Wilson',
      email: 'admin@liquidhome.co.zw',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-15T08:00:00Z',
    },
  ])

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    supervisors: 0,
    admins: 0,
  })

  useEffect(() => {
    setStats({
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'active').length,
      supervisors: users.filter(u => u.role === 'supervisor').length,
      admins: users.filter(u => u.role === 'admin').length,
    })
  }, [users])

  if (currentUser?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-800 mb-2">Access Denied</h2>
            <p className="text-red-600">You don't have permission to access the admin panel.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-surface-900">Admin Panel</h1>
          <p className="text-surface-600 mt-2">Manage users, roles, and system settings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-surface-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-surface-600">Total Users</p>
                <p className="text-2xl font-bold text-surface-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-surface-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-surface-600">Active Users</p>
                <p className="text-2xl font-bold text-surface-900">{stats.activeUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-surface-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-surface-600">Supervisors</p>
                <p className="text-2xl font-bold text-surface-900">{stats.supervisors}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-surface-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-surface-600">Admins</p>
                <p className="text-2xl font-bold text-surface-900">{stats.admins}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border border-surface-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-surface-200">
            <h2 className="text-lg font-semibold text-surface-900">User Management</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-50 border-b border-surface-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-surface-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-surface-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-surface-700">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-surface-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-surface-700">Last Login</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-surface-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-surface-50">
                    <td className="px-6 py-4 text-sm text-surface-900">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-surface-600">{user.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-red-100 text-red-800' :
                        user.role === 'supervisor' ? 'bg-purple-100 text-purple-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-surface-600">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-primary-600 hover:text-primary-800 font-medium">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

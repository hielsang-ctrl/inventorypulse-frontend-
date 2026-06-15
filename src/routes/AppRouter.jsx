import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Layout from '../components/layout/Layout'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Products from '../pages/Products'
import StockIn from '../pages/StockIn'
import NotFound from '../pages/NotFound'
import Reports from '../pages/Reports'
import Users from '../pages/Users'

import ProtectedRoute from './ProtectedRoute'
import RoleRoute from './RoleRoute'
import useAuthStore from '../store/authStore'

function AppRouter() {
  const user = useAuthStore((state) => state.user)
  const loading = useAuthStore((state) => state.loading)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <BrowserRouter>

      
      <Routes>

        {/* SIGNUP */}
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />

        {/* PROTECTED AREA */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="stock-in" element={<StockIn />} />

          <Route
            path="reports"
            element={
              <RoleRoute allowedRoles={['admin', 'staff']}>
                <Reports />
              </RoleRoute>
            }
          />

          <Route
            path="users"
            element={
              <RoleRoute allowedRoles={['admin']}>
                <Users />
              </RoleRoute>
            }
          />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>

    </BrowserRouter>
  )
}

export default AppRouter
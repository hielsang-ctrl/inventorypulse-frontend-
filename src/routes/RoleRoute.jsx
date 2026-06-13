import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

function RoleRoute({ children, allowedRoles }) {
  const user = useAuthStore((state) => state.user)
  const loading = useAuthStore((state) => state.loading)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  
  const role = user.role

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />
  }

  return children
}

export default RoleRoute
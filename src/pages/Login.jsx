import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const login = useAuthStore((state) => state.login)
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle)
  const user = useAuthStore((state) => state.user)

  const navigate = useNavigate()

  // redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password)
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    try {
      await loginWithGoogle()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded w-80">

        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-[#1E3A5F] text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

      
        <button
          type="button"
          onClick={handleGoogle}
          className="w-full mt-3 border p-2 rounded hover:bg-gray-100"
        >
          Continue with Google
        </button>

        
        <p
          className="text-sm mt-4 text-center text-blue-600 cursor-pointer hover:underline"
          onClick={() => navigate('/signup')}
        >
          Don't have an account? Sign up
        </p>

      </form>
    </div>
  )
}

export default Login
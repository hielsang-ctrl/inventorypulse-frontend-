import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../services/firebase'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      await updateProfile(userCredential.user, {
        displayName: name
      })

      alert('Account created successfully')
      navigate('/login')

    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <form onSubmit={handleSignup} className="bg-white p-6 shadow rounded w-80">

        <h1 className="text-xl font-bold mb-4">Sign Up</h1>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          className="w-full bg-[#1E3A5F] text-white p-2 rounded"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>

        <p
          className="text-sm mt-3 text-center text-blue-600 cursor-pointer"
          onClick={() => navigate('/login')}
        >
          Already have an account? Login
        </p>

      </form>
    </div>
  )
}

export default Signup
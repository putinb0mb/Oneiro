import { useState } from 'react'
import axios from 'axios'

export default function Signup({ setToken, goToLogin, goToLanding }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        email,
        password,
      })
      localStorage.setItem('token', res.data.token)
      setToken(res.data.token)
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white/10 rounded-lg text-white">
      <h2 className="text-2xl mb-4 font-semibold">Signup</h2>
      <form onSubmit={handleSignup} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Username"
          className="p-2 rounded bg-white/20"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded bg-white/20"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded bg-white/20"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="py-2 bg-indigo-600 rounded hover:opacity-90">
          Create Account
        </button>
      </form>
      <div className="mt-4 flex justify-between text-sm">
        <button className="underline" onClick={goToLogin}>
          Already have an account? Login
        </button>
        <button className="underline" onClick={goToLanding}>
          Back to Landing
        </button>
      </div>
    </div>
  )
}

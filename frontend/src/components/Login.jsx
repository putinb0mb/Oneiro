import { useState } from 'react'
import axios from 'axios'

export default function Login({ setToken, goToSignup, goToLanding }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      })
      localStorage.setItem('token', res.data.token)
      setToken(res.data.token)
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white/10 rounded-lg text-white">
      <h2 className="text-2xl mb-4 font-semibold">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
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
        <button className="py-2 bg-purple-600 rounded hover:opacity-90">
          Login
        </button>
      </form>
      <div className="mt-4 flex justify-between text-sm">
        <button className="underline" onClick={goToSignup}>
          Create Account
        </button>
        <button className="underline" onClick={goToLanding}>
          Back to Landing
        </button>
      </div>
    </div>
  )
}

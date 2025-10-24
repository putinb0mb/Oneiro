import { useState, useEffect } from 'react'
import DreamInput from './components/DreamInput.jsx'
import SavedDreams from './components/SavedDreams.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import axios from 'axios'

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [dreams, setDreams] = useState([])
  const [decoded, setDecoded] = useState(null)
  const [typing, setTyping] = useState(false)
  const [page, setPage] = useState('landing') // landing, login, signup

  // Fetch dreams whenever token changes (user logs in)
  useEffect(() => {
    if (token) fetchDreams()
  }, [token])

  // Fetch dreams from backend
  const fetchDreams = async () => {
    if (!token) return
    try {
      const res = await axios.get('https://oneiro-iou7.onrender.com/api/dreams', {
        headers: { Authorization: `Bearer ${token}` },
      })
      // Extract the dreams array from response
      setDreams(res.data.dreams || [])
    } catch (err) {
      console.error('Failed to fetch dreams:', err)
    }
  }

  // Called when a new dream is decoded
  const handleDecoded = (resData) => {
    if (!resData) return

    const newDream = resData // backend sends data object
    setTyping(true)
    setDecoded(null)

    // Simulate decoding delay
    setTimeout(() => {
      setDecoded(newDream)
      setTyping(false)
      setDreams((prev) => [newDream, ...prev])
    }, 1200)
  }

  // If user not logged in → show landing / login / signup
  if (!token) {
    if (page === 'landing')
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-950 to-purple-900 text-white p-8">
          <h1 className="text-6xl font-bold mb-6 text-center">🌙 Oneiro</h1>
          <p className="mb-8 text-center max-w-md">
            Decode your dreams and discover hidden meanings, moods, and advice.
            Join Oneiro today!
          </p>
          <div className="flex gap-6">
            <button
              className="py-3 px-6 bg-purple-600 rounded-lg hover:opacity-90"
              onClick={() => setPage('login')}
            >
              Login
            </button>
            <button
              className="py-3 px-6 bg-indigo-600 rounded-lg hover:opacity-90"
              onClick={() => setPage('signup')}
            >
              Create Account
            </button>
          </div>
        </div>
      )

    if (page === 'login')
      return (
        <Login
          setToken={setToken}
          goToSignup={() => setPage('signup')}
          goToLanding={() => setPage('landing')}
        />
      )

    if (page === 'signup')
      return (
        <Signup
          setToken={setToken}
          goToLogin={() => setPage('login')}
          goToLanding={() => setPage('landing')}
        />
      )
  }

  // Main app for logged-in users
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-purple-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8 tracking-wide">
        🌙 Oneiro — Dream Decoder
      </h1>
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between mb-4">
          <button
            className="text-sm underline"
            onClick={() => {
              localStorage.removeItem('token')
              setToken(null)
              setPage('landing')
            }}
          >
            Logout
          </button>
        </div>

        {/* Dream input component */}
        <DreamInput onDecoded={handleDecoded} token={token} />

        {/* Typing/decoding animation */}
        {typing && (
          <div className="bg-white/10 p-5 mt-6 rounded-xl">
            <p className="italic text-gray-300">Decoding your dream...</p>
          </div>
        )}

        {/* Display decoded dream */}
        {decoded && !typing && (
          <div className="bg-white/10 p-5 mt-6 rounded-xl">
            <p>
              <strong>Meaning:</strong> {decoded.meaning}
            </p>
            <p>
              <strong>Mood:</strong> {decoded.mood}
            </p>
            <p>
              <strong>Theme:</strong> {decoded.theme}
            </p>
            <p className="text-green-300 italic mt-1">
              <strong>Advice:</strong> {decoded.advice}
            </p>
          </div>
        )}

        {/* Saved dreams list */}
        <SavedDreams dreams={dreams} />
      </div>
    </div>
  )
}

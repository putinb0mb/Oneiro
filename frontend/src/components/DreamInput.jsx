import { useState } from 'react'
import axios from 'axios'

export default function DreamInput({ onDecoded, token }) {
  const [dream, setDream] = useState('')
  const [loading, setLoading] = useState(false)

  const handleDecode = async () => {
    if (!dream.trim()) return
    setLoading(true)
    try {
      const res = await axios.post(
        'https://oneiro-iou7.onrender.com/api/dreams',
        { text: dream },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      // Pass the actual dream object, not the whole response
      if (res.data && res.data.success && res.data.data) {
        onDecoded(res.data.data)
      } else {
        alert('Unexpected response from server')
        console.log('Server response:', res.data)
      }
    } catch (err) {
      console.error(err)
      alert('Failed to decode dream')
    } finally {
      setDream('')
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/10 p-6 rounded-2xl shadow-lg">
      <textarea
        rows="4"
        placeholder="Type your dream..."
        className="w-full p-3 rounded-lg bg-transparent border border-purple-500 focus:outline-none"
        value={dream}
        onChange={(e) => setDream(e.target.value)}
      />
      <button
        className="mt-4 w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg hover:opacity-90"
        onClick={handleDecode}
        disabled={loading}
      >
        {loading ? 'Decoding...' : 'Decode Dream'}
      </button>
    </div>
  )
}

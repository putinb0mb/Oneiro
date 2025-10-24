import React, { useEffect, useState } from 'react'

const SavedDreams = ({ dreamsProp }) => {
  const [dreams, setDreams] = useState(dreamsProp || [])
  const [loading, setLoading] = useState(!dreamsProp)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (dreamsProp) return // already passed from parent
    const fetchDreams = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No token found')

        const res = await fetch('https://oneiro-iou7.onrender.com/api/dreams', {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || 'Failed to fetch dreams')
        }

        const data = await res.json()
        if (Array.isArray(data.dreams)) setDreams(data.dreams)
        else setDreams([])
      } catch (err) {
        console.error('Error fetching dreams:', err)
        setError(err.message || 'Failed to load dreams')
      } finally {
        setLoading(false)
      }
    }

    fetchDreams()
  }, [dreamsProp])

  if (loading)
    return <p className="text-white text-center mt-4">Loading dreams...</p>
  if (error) return <p className="text-white text-center mt-4">{error}</p>
  if (dreams.length === 0)
    return <p className="text-white text-center mt-4">No dreams saved yet 🌙</p>

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-1 md:grid-cols-2">
      {dreams.map((dream) => (
        <div
          key={dream._id}
          className="bg-white/10 p-5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200"
        >
          <h3 className="text-xl font-semibold mb-2">{dream.theme}</h3>
          <p className="text-gray-200 mb-2">{dream.meaning}</p>
          <p className="text-gray-400">
            <strong>Mood:</strong> {dream.mood}
          </p>
          <p className="text-green-300 italic mt-1">
            <strong>Advice:</strong> {dream.advice}
          </p>
          <p className="text-gray-400 text-xs mt-1">
            {dream.date
              ? new Date(dream.date).toLocaleString()
              : 'Unknown date'}
          </p>
        </div>
      ))}
    </div>
  )
}

export default SavedDreams

export default function DreamCard({ dream }) {
  return (
    <div className="bg-white/5 p-4 mb-3 rounded-lg">
      <p className="text-purple-200 italic">“{dream.text}”</p>
      <p>
        <strong>Meaning:</strong> {dream.meaning}
      </p>
      <p>
        <strong>Mood:</strong> {dream.mood}
      </p>
      <p>
        <strong>Theme:</strong> {dream.theme}
      </p>
      <p className="text-green-300 italic mt-1">
        <strong>Advice:</strong> {dream.advice}
      </p>
      <small className="text-gray-400">
        {new Date(dream.date).toLocaleString()}
      </small>
    </div>
  )
}

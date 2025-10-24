import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// ✅ Load environment variables first
dotenv.config()

// ✅ Validate essential env vars
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error('❌ Missing environment variables! Check your .env file.')
  process.exit(1)
}

import connectDB from './config/db.js'

const app = express()

// ✅ Middleware
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)
app.use(express.json())

// ✅ Connect DB first
connectDB()

app.get('/', (req, res) => {
  res.send('🌙 Oneiro backend is live and running!');
});

// ✅ Dynamically import routes *after* dotenv is loaded
const loadRoutes = async () => {
  const { default: authRoutes } = await import('./routes/authRoutes.js')
  const { default: dreamRoutes } = await import('./routes/dreamRoutes.js')

  app.use('/api/auth', authRoutes)
  app.use('/api/dreams', dreamRoutes)

  // ✅ Global error handler
  app.use((err, req, res, next) => {
    console.error('🔥 Server error:', err.stack)
    res.status(500).json({ error: 'Internal server error' })
  })

  const PORT = process.env.PORT || 5000
  app.listen(PORT, () =>
    console.log(`🌙 Oneiro backend running on port ${PORT}`)
  )
}

loadRoutes()

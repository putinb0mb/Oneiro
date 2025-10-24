import express from 'express'
import jwt from 'jsonwebtoken'
import Dream from '../models/Dream.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key'

// 🛡️ Middleware to protect routes
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader)
    return res.status(401).json({ error: 'No authorization header' })

  const token = authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token provided' })

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    // Check decoded payload
    req.userId = decoded.id || decoded.userId
    if (!req.userId)
      return res.status(401).json({ error: 'Invalid token payload' })
    next()
  } catch (err) {
    console.error('JWT verification error:', err)
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

// 🌙 Dream interpretation patterns
const dreamPatterns = [
  {
    keywords: ['fly', 'flying'],
    meaning: 'You crave freedom and self-expression.',
    mood: 'Uplifting',
    theme: 'Freedom',
    advice: 'Explore new horizons fearlessly.',
  },
  {
    keywords: ['water', 'ocean', 'sea', 'rain'],
    meaning: 'You are processing deep emotions.',
    mood: 'Calm',
    theme: 'Emotions',
    advice: 'Flow with your feelings instead of resisting them.',
  },
  {
    keywords: ['fire', 'burning'],
    meaning: 'Symbolizes passion or transformation.',
    mood: 'Intense',
    theme: 'Rebirth',
    advice: 'Channel your energy into creativity or change.',
  },
  {
    keywords: ['chase', 'running from'],
    meaning: 'You might be avoiding a real-life issue.',
    mood: 'Tense',
    theme: 'Conflict',
    advice: 'Face your fears with courage and patience.',
  },
  {
    keywords: ['fall', 'falling'],
    meaning: 'A sign of losing control or insecurity.',
    mood: 'Anxious',
    theme: 'Fear',
    advice: 'Reground yourself — stability is returning.',
  },
  {
    keywords: ['love', 'kiss', 'heart'],
    meaning: 'Reflects desire for affection or connection.',
    mood: 'Warm',
    theme: 'Relationships',
    advice: 'Open your heart and express gratitude.',
  },
  {
    keywords: ['baby', 'child', 'birth'],
    meaning: 'Symbolizes new beginnings or innocence.',
    mood: 'Hopeful',
    theme: 'Growth',
    advice: 'Nurture your inner child and ideas.',
  },
  {
    keywords: ['death', 'dead', 'grave'],
    meaning: 'Represents transformation, not literal death.',
    mood: 'Somber',
    theme: 'Endings',
    advice: 'Let go of what no longer serves you.',
  },
  {
    keywords: ['dark', 'night', 'shadow'],
    meaning: 'Facing the unknown or your shadow self.',
    mood: 'Mysterious',
    theme: 'Subconscious',
    advice: 'Reflect through journaling or meditation.',
  },
  {
    keywords: ['school', 'exam', 'test'],
    meaning: 'Anxiety about performance or self-worth.',
    mood: 'Pressured',
    theme: 'Learning',
    advice: 'Trust your preparation — you are capable.',
  },
  {
    keywords: ['snake', 'serpent'],
    meaning: 'Symbol of healing, fear, or hidden danger.',
    mood: 'Unsettling',
    theme: 'Transformation',
    advice: 'Acknowledge and transform inner tension.',
  },
]

// 🧩 Improved dream interpretation
const interpretDream = (text) => {
  const lower = text.toLowerCase()
  const matchedPatterns = dreamPatterns.filter((pattern) =>
    pattern.keywords.some((keyword) => lower.includes(keyword))
  )

  if (matchedPatterns.length === 0) {
    return {
      meaning: 'Your subconscious is exploring unknown symbols.',
      mood: 'Mystical',
      theme: 'Unknown',
      advice: 'Record your dreams regularly to find patterns.',
    }
  }

  // For multiple matches, combine meanings (optional, can enhance later)
  const combinedMeaning = matchedPatterns.map((p) => p.meaning).join(' ')
  const combinedMood = matchedPatterns[0].mood
  const combinedTheme = matchedPatterns[0].theme
  const combinedAdvice = matchedPatterns.map((p) => p.advice).join(' ')

  return {
    meaning: combinedMeaning,
    mood: combinedMood,
    theme: combinedTheme,
    advice: combinedAdvice,
  }
}

// ✨ POST: Add dream + interpretation
router.post('/', protect, async (req, res) => {
  try {
    const { text } = req.body
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Dream text is required.' })
    }

    console.log('Interpreting dream for user:', req.userId, 'Text:', text)

    const { meaning, mood, theme, advice } = interpretDream(text)

    const dream = await Dream.create({
      user: req.userId,
      text,
      meaning,
      mood,
      theme,
      advice,
      createdAt: new Date(),
    })

    console.log('Saved dream:', dream)

    return res.status(201).json({
      success: true,
      message: 'Dream interpreted successfully.',
      data: dream,
    })
  } catch (err) {
    console.error('Error saving dream:', err)
    return res.status(500).json({ error: 'Failed to save dream.' })
  }
})

// 🌌 GET: All dreams for logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const dreams = await Dream.find({ user: req.userId }).sort({
      createdAt: -1,
    })
    return res.json({ success: true, count: dreams.length, dreams })
  } catch (err) {
    console.error('Error fetching dreams:', err)
    return res.status(500).json({ error: 'Failed to fetch dreams.' })
  }
})

export default router

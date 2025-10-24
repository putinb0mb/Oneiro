import mongoose from 'mongoose'

const dreamSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  meaning: String,
  mood: String,
  theme: String,
  advice: String,
  date: { type: Date, default: Date.now },
})

export default mongoose.model('Dream', dreamSchema)

# 🌙 Oneiro — Dream Decoder

**Oneiro** is a MERN stack application that allows users to log, save, and analyze their dreams. Each dream is interpreted for meaning, mood, theme, and advice using a custom AI-inspired logic.

---

## Features
- User authentication (signup/login) with JWT
- Add, view, and save dreams
- Automatic dream interpretation (meaning, mood, theme, advice)
- Responsive UI with interactive cards for saved dreams
- Secure backend with protected routes

---

## Tech Stack
- **Frontend:** React, TailwindCSS, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **Deployment:** Render (Backend), Vercel/Netlify (Frontend)

---

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/oneiro.git
   ```
2. Install dependencies for backend:
   ```bash
   cd backend
   npm install
   ```
3. Install dependencies for frontend:
   ```bash
   cd ../frontend
   npm install
   ```
4. Create a `.env` file in the backend:
   ```env
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret
   ```

---

## Running Locally
### Backend
```bash
cd backend
npm start
```
### Frontend
```bash
cd frontend
npm run dev
```
Open your browser at `http://localhost:5173` (Vite) or `http://localhost:3000` (CRA).

---

## Deployment
- **Backend:** Deploy to Render, Heroku, or Railway. Set environment variables `MONGO_URI` and `JWT_SECRET`.
- **Frontend:** Deploy to Vercel, Netlify, or any static hosting platform.

---

## Usage
1. Sign up or log in.
2. Enter your dream in the input box.
3. Get instant interpretation (meaning, mood, theme, advice).
4. View all saved dreams as interactive cards.


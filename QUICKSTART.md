# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Configure Google Gemini API Key

1. Get your FREE API key from: https://aistudio.google.com/app/apikey
2. Create a file named `.env` in the `backend` folder
3. Add this line (replace with your actual key):
```
GEMINI_API_KEY=your-actual-gemini-api-key-here
```

### Step 3: Run the Application

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```
✅ Backend running on http://localhost:5000

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```
✅ Frontend running on http://localhost:3000

## 🎯 Test It Out

1. Open http://localhost:3000 in your browser
2. Paste a YouTube URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)
3. Click "Analyze Video"
4. Wait 15-30 seconds for AI magic ✨
5. Get summary, key points, and 10 quiz questions!

## ⚠️ Common Issues

**"OpenAI API Key Missing"**
- Make sure `.env` file is in the `backend` folder
- Restart the backend server after adding the key

**"Failed to fetch transcript"**
- Ensure the video has captions/subtitles enabled
- Try a different educational video

**Port already in use**
- Kill the process using port 5000
- Or change PORT in `.env` file

---

Need help? Check the main README.md for detailed documentation.

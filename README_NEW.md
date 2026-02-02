# 🎓 YouTube Learning Assistant

Transform any educational YouTube video into a complete learning package with AI-powered summaries, key points, and interactive quizzes.

## ✨ Features

- 📝 **AI-Generated Summaries**: Get concise summaries of video content
- 💡 **Key Learning Points**: Extract the most important concepts  
- 📋 **Interactive Quizzes**: Test your knowledge with 10 AI-generated questions
- 🎯 **Transcript Analysis**: Full video transcript extraction
- 🤖 **Powered by Google Gemini AI**: Advanced AI analysis
- 🎨 **Beautiful UI**: Modern, responsive interface

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API Key ([Get one free](https://aistudio.google.com/app/apikey))

### Installation

1. **Install Backend Dependencies**
```bash
cd backend
npm install
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

3. **Environment Variables**

Backend `.env` file (already configured):
```
GEMINI_API_KEY=AIzaSyBUmoUymsihWy8lVQ2OYS_7w9mhUBJ4cGk
PORT=5001
```

Frontend `.env` file (already configured):
```
PORT=3001
BROWSER=none
```

### Running the Application

#### ⭐ Option 1: Use the Startup Script (Easiest)
Double-click **`start-servers.bat`** in the application folder. This will automatically start both servers.

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Access the Application

- **Frontend Application**: http://localhost:3001
- **Backend API**: http://localhost:5001

## 📖 How to Use

1. Open http://localhost:3001 in your browser
2. Paste a YouTube URL (e.g., `https://www.youtube.com/watch?v=VIDEO_ID`)
3. Click "Analyze Video"
4. Wait 15-30 seconds for AI processing
5. Review the summary, key points, and take the interactive quiz!

## 🛠️ Tech Stack

### Backend
- **Express.js** - Web framework
- **Google Generative AI (Gemini 1.5 Pro)** - AI analysis
- **youtube-transcript** - Transcript extraction
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### Frontend
- **React 19** - UI framework
- **Modern CSS** - Beautiful gradient styling
- **Fetch API** - HTTP requests

## 📡 API Endpoints

### POST /analyze
Analyzes a YouTube video and returns educational content.

**Request:**
```json
{
  "url": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

**Response:**
```json
{
  "success": true,
  "transcript": "Full video transcript...",
  "summary": "AI-generated summary...",
  "keyPoints": ["Point 1", "Point 2", ...],
  "quiz": [
    {
      "question": "Question text?",
      "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
      "correctAnswer": "A"
    }
  ]
}
```

### GET /
Health check endpoint - returns confirmation that the API is running.

## 🔧 Configuration

### Ports
- **Backend**: Port 5001 (configurable in `backend/.env`)
- **Frontend**: Port 3001 (configurable in `frontend/.env`)

### Changing Ports

If you need to change the ports:

1. **Backend Port**: Edit `backend/.env` and change `PORT=5001`
2. **Frontend Port**: Edit `frontend/.env` and change `PORT=3001`  
3. **Important**: If you change the backend port, also update `frontend/src/App.js` line 23 to match

## 🐛 Troubleshooting

### Port Already in Use
If you see a port conflict error:
- Change the port in the respective `.env` file
- Make sure no other applications are using ports 3001 or 5001

### API Key Issues
- Verify your Gemini API key is valid
- Check that it's correctly set in `backend/.env`
- Get a new key at https://aistudio.google.com/app/apikey

### Cannot Connect to Server
- Ensure both backend and frontend servers are running
- Check that you're accessing http://localhost:3001 (not 3000)
- Verify the backend is running on port 5001

### Transcript Unavailable
- Some videos don't have captions/transcripts available
- The app will use a demo transcript in such cases for testing

### Installation Issues
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📁 Project Structure

```
application/
├── backend/
│   ├── server.js              # Main Express server
│   ├── package.json           # Backend dependencies
│   ├── .env                   # Environment variables (API key, port)
│   └── test-*.js              # Test scripts
├── frontend/
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── App.css           # Application styling
│   │   └── index.js          # React entry point
│   ├── public/               # Static files
│   ├── package.json          # Frontend dependencies
│   └── .env                  # Frontend configuration
├── start-servers.bat         # Windows startup script
├── start-servers.ps1         # PowerShell startup script
└── README.md                 # This file
```

## 🎯 Features in Detail

### AI Summary
- Comprehensive 200-300 word overview
- Captures main concepts and themes
- Clear and easy to understand

### Key Learning Points
- 5-7 crucial bullet points
- Organized for quick review
- Perfect for note-taking

### Interactive Quiz
- Exactly 10 multiple-choice questions
- 4 options per question
- Instant feedback with visual indicators
- Score tracking and percentage display
- Correct answers highlighted in green
- Wrong answers marked with X

### Full Transcript
- Complete video transcript available
- Useful for detailed study and reference
- Scrollable content box

## 💡 Tips

- Works best with educational content
- Videos with clear audio produce better transcripts
- The AI analysis may take 15-30 seconds
- You can retake quizzes by refreshing the analysis

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features  
- Submit pull requests

## 📄 License

ISC

## 🙏 Acknowledgments

- Google Generative AI (Gemini) for powerful AI capabilities
- youtube-transcript for transcript extraction
- React team for the excellent framework

---

**Made with ❤️ for learners everywhere**

For questions or issues, please check the Troubleshooting section above.

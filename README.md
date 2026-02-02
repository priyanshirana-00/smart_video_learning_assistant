# 🎓 YouTube Learning Assistant

Transform any educational YouTube video into a complete learning package with AI-powered summaries, key points, and quizzes.

## 📋 Features

- **Transcript Extraction**: Automatically extracts transcripts from YouTube videos
- **AI-Powered Summary**: Generates comprehensive 200-300 word summaries
- **Key Learning Points**: Identifies 5-7 core concepts from the video
- **Interactive Quizzes**: Creates exactly 10 multiple-choice questions based on actual content
- **Beautiful UI**: Modern, responsive interface with gradient design
- **Real-time Scoring**: Instant quiz results with visual feedback

## 🛠️ Technologies Used

### Backend
- Node.js & Express.js
- Google Gemini API (gemini-flash-latest)
- YouTube Transcript API
- CORS & dotenv

### Frontend
- React 19
- Modern CSS with gradients
- Responsive design

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key ([Get it free here](https://aistudio.google.com/app/apikey))

### Step 1: Clone or Navigate to the Project
```bash
cd application
```

### Step 2: Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
```

### Step 3: Frontend Setup
```bash
cd ../frontend
npm install
```

## 🚀 Running the Application

### Terminal 1 - Start Backend Server
```bash
cd backend
npm start
```
Server will run on http://localhost:5000

### Terminal 2 - Start Frontend
```bash
cd frontend
npm start
```
Frontend will run on http://localhost:3000

## 📖 How to Use

1. **Open the Application**: Navigate to http://localhost:3000 in your browser

2. **Enter YouTube URL**: Paste any educational YouTube video URL
   - Example: `https://www.youtube.com/watch?v=VIDEO_ID`

3. **Click "Analyze Video"**: The system will:
   - Extract the video transcript
   - Generate AI-powered summary
   - Create key learning points
   - Generate 10 quiz questions

4. **Review Results**:
   - Read the comprehensive summary
   - Study the key learning points
   - Take the interactive quiz
   - View your score instantly

5. **Quiz Features**:
   - Select answers by clicking options
   - Submit quiz to see results
   - Green = Correct answer
   - Red = Incorrect answer

## 🔑 Getting Your Google Gemini API Key (100% FREE!)

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key
5. Paste it into your `.env` file as `GEMINI_API_KEY`

**✨ Completely FREE:**
- No credit card required
- 60 requests per minute
- 1,500 requests per day
- Perfect for learning and development!

Unlike OpenAI which requires payment, Google Gemini offers a generous free tier with no charges!

## 📁 Project Structure

```
application/
├── backend/
│   ├── server.js          # Main server file with API endpoints
│   ├── package.json       # Backend dependencies
│   ├── .env              # Environment variables (create this)
│   └── .env.example      # Environment template
│
├── frontend/
│   ├── public/
│   │   └── index.html    # HTML template
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── App.css       # Styling
│   │   └── index.js      # Entry point
│   └── package.json      # Frontend dependencies
│
└── README.md             # This file
```

## 🌟 API Endpoints

### POST /analyze
Analyzes a YouTube video and returns AI-generated content.

**Request Body**:
```json
{
  "url": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

**Response**:
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

## ⚠️ Troubleshooting

### Backend won't start
- Ensure Node.js is installed: `node --version`
- Check if port 5000 is available
- Verify all dependencies: `npm install`
- Check `.env` file exists with valid API key

### Frontend won't start
- Ensure React dependencies are installed: `npm install`
- Clear cache: `npm cache clean --force`
- Delete `node_modules` and reinstall

### "OpenAI API Key Missing" error
- Create `.env` file in backend folder
- Add: `OPENAI_API_KEY=your_actual_key_here`
- Restart the backend server

### "Failed to fetch transcript"
- Ensure the YouTube video has captions/subtitles
- Try a different video
- Check if the URL format is correct

### Quiz not generating 10 questions
- Ensure the video has enough content
- Try videos longer than 5 minutes
- Check OpenAI API response in backend logs

## 💡 Tips for Best Results

1. **Video Selection**:
   - Choose educational videos with clear speech
   - Videos should be at least 5-10 minutes long
   - Ensure subtitles/captions are available

2. **Cost Optimization**:
   - GPT-3.5-turbo is cost-effective
   - Each analysis costs approximately $0.002-0.01
   - Monitor your OpenAI usage dashboard

3. **Performance**:
   - Analysis takes 15-30 seconds
   - Longer videos may take more time
   - Keep transcript under 12,000 characters for best results

## 🎯 Future Enhancements

- [ ] Support for multiple languages
- [ ] Export results as PDF
- [ ] Save analysis history
- [ ] Flashcard generation
- [ ] Video chapter breakdown
- [ ] Study timer integration
- [ ] Share results functionality

## 📄 License

MIT License - Feel free to use this project for learning and development.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📧 Support

If you encounter any issues or have questions, please create an issue in the repository.

---

**Made with ❤️ for students and lifelong learners**

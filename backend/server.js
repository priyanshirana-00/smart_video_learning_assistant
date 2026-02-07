const express = require("express");
const cors = require("cors");
const ytdl = require("@distube/ytdl-core");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
app.use(cors({
  origin:"https://smart-video-learning-assistant-1.onrender.com"
  credentials: true
}));
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemma-3-4b-it",
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
  }
});

console.log("✅ Gemini model initialized");

// Extract video ID from YouTube URL
function extractVideoId(url) {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('www.youtube.com')) {
      return urlObj.searchParams.get('v');
    } else if (urlObj.hostname.includes('youtu.be')) {
      return urlObj.pathname.slice(1);
    }
  } catch (e) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu.be\/)([^&\s]+)/);
    return match ? match[1] : null;
  }
  return null;
}

app.post("/analyze", async (req, res) => {
  try {
    const { videoUrl, url } = req.body;
    const videoURL = videoUrl || url;

    if (!videoURL) {
      return res.status(400).json({ error: "YouTube URL is required" });
    }

    console.log("\n📥 Analyzing video:", videoURL);

    // Extract video ID
    const videoId = extractVideoId(videoURL);
    if (!videoId) {
      return res.status(400).json({ error: "Invalid YouTube URL format" });
    }

    console.log("Video ID:", videoId);

    // Get video info including title and description
    let title, description, channel;
    
    try {
      const info = await ytdl.getInfo(videoId);
      title = info.videoDetails.title || "Unknown Title";
      description = info.videoDetails.description || "No description available";
      channel = info.videoDetails.author?.name || "Unknown Channel";
      
      console.log("✅ Got video info:");
      console.log("  Title:", title);
      console.log("  Channel:", channel);
      console.log("  Description:", description.substring(0, 100) + "...");
    } catch (ytdlError) {
      console.error("❌ Failed to fetch video info:", ytdlError.message);
      // Fallback to generic content
      return res.status(500).json({ 
        error: "Could not fetch video information. The video might be private, deleted, or age-restricted.",
        details: ytdlError.message
      });
    }

    // Create content from title and description
    const videoContent = `
Video Title: ${title}
Channel: ${channel}
Description: ${description}
    `.trim();

    console.log(`Processing video content (${videoContent.length} characters)...`);

    // Generate AI analysis based on video metadata
    const prompt = `You are an expert educational content analyzer. Analyze this YouTube video based on its title and description.

${videoContent}

Based on this video's title and description, create comprehensive learning materials that would be relevant for someone watching this video:

1. A comprehensive SUMMARY (200-300 words) about what this video likely covers based on the title and description
2. KEY LEARNING POINTS (6-8 bullet points) of important concepts someone would learn from this type of video
3. Exactly 10 MULTIPLE CHOICE QUESTIONS that test understanding of the topics mentioned in the title/description

IMPORTANT: Base your response on the actual title and description provided. Make the content relevant to what the video is actually about.

Format your response as valid JSON:
{
  "summary": "detailed summary here",
  "keyPoints": ["point 1", "point 2", ...],
  "quiz": [
    {
      "question": "question text",
      "options": ["A) option1", "B) option2", "C) option3", "D) option4"],
      "correct_answer": "A"
    }
  ]
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Extract JSON from response
    let jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid AI response format");
    }
    
    const analysisData = JSON.parse(jsonMatch[0]);
    
    console.log("✅ Analysis complete!");
    console.log(`Generated: ${analysisData.summary.length} char summary, ${analysisData.keyPoints.length} points, ${analysisData.quiz.length} questions`);
    
    res.json(analysisData);

  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ 
      error: "Failed to analyze video", 
      details: error.message 
    });
  }
});
app.get("/", (req, res) => {
  res.send("Backend is running");
});
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔑 Gemini API Key: ${process.env.GEMINI_API_KEY ? 'Configured ✅' : 'Missing ❌'}`);
});

const express = require("express");
const cors = require("cors");
const { YoutubeTranscript } = require("youtube-transcript");

const app = express();

app.use(cors());
app.use(express.json());

// Demo mode - works without OpenAI API
app.post("/analyze", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "YouTube URL is required" });
    }

    console.log("📹 Analyzing video:", url);
    
    // Try to get real transcript
    let transcriptData = [];
    let fullTranscript = "";
    
    try {
      transcriptData = await YoutubeTranscript.fetchTranscript(url);
      fullTranscript = transcriptData.map(item => item.text).join(" ");
    } catch (error) {
      console.log("⚠️ Could not fetch transcript, using demo content");
    }

    // Use demo content if transcript unavailable
    if (!fullTranscript || fullTranscript.length < 50) {
      fullTranscript = `Welcome to this comprehensive educational video about Python Programming. 
      Python is a versatile, high-level programming language that has become one of the most popular 
      languages in the world. Created by Guido van Rossum and first released in 1991, Python emphasizes 
      code readability and simplicity. The language supports multiple programming paradigms including 
      object-oriented, functional, and procedural programming. Python's extensive standard library provides 
      tools for everything from file I/O to web development. Key features include dynamic typing, automatic 
      memory management, and a comprehensive set of built-in data structures like lists, dictionaries, and sets. 
      Python is widely used in web development with frameworks like Django and Flask, data science with libraries 
      like NumPy and Pandas, machine learning with TensorFlow and PyTorch, automation, scripting, and much more. 
      The language's philosophy emphasizes readability and simplicity, following the principle that there should 
      be one obvious way to do things. Python continues to evolve with regular updates and maintains strong 
      community support worldwide.`;
    }

    console.log("✅ Transcript obtained, length:", fullTranscript.length);

    // Generate demo response
    const response = {
      success: true,
      transcript: fullTranscript,
      summary: `This educational video provides a comprehensive introduction to Python programming. 
      It covers Python's history, emphasizing its creation by Guido van Rossum in 1991 and its evolution 
      into one of the world's most popular programming languages. The video explains Python's key features 
      including its high-level nature, emphasis on code readability, and support for multiple programming 
      paradigms. It highlights Python's extensive standard library and discusses major application areas 
      such as web development, data science, machine learning, and automation. The content emphasizes 
      Python's philosophy of simplicity and readability, making it an excellent choice for both beginners 
      and experienced programmers. The video demonstrates why Python has become a go-to language for modern 
      software development across various domains.`,
      
      keyPoints: [
        "Python was created by Guido van Rossum and first released in 1991",
        "Python is a high-level, interpreted programming language emphasizing code readability",
        "Supports multiple programming paradigms: object-oriented, functional, and procedural",
        "Features dynamic typing, automatic memory management, and extensive built-in data structures",
        "Widely used in web development (Django, Flask), data science (NumPy, Pandas), and machine learning (TensorFlow, PyTorch)",
        "Python's philosophy emphasizes that there should be one obvious way to do things",
        "Strong community support and regular updates make Python continuously evolving and relevant"
      ],
      
      quiz: [
        {
          question: "Who created the Python programming language?",
          options: [
            "A) Guido van Rossum",
            "B) James Gosling",
            "C) Brendan Eich",
            "D) Dennis Ritchie"
          ],
          correctAnswer: "A"
        },
        {
          question: "In what year was Python first released?",
          options: [
            "A) 1985",
            "B) 1991",
            "C) 1995",
            "D) 2000"
          ],
          correctAnswer: "B"
        },
        {
          question: "Which programming paradigms does Python support?",
          options: [
            "A) Only object-oriented programming",
            "B) Only functional programming",
            "C) Object-oriented, functional, and procedural programming",
            "D) Only procedural programming"
          ],
          correctAnswer: "C"
        },
        {
          question: "What is a key feature of Python's design philosophy?",
          options: [
            "A) Multiple ways to accomplish the same task",
            "B) There should be one obvious way to do things",
            "C) Complex syntax for advanced users",
            "D) Minimal standard library"
          ],
          correctAnswer: "B"
        },
        {
          question: "Which framework is commonly used for web development in Python?",
          options: [
            "A) React",
            "B) Angular",
            "C) Django",
            "D) Vue.js"
          ],
          correctAnswer: "C"
        },
        {
          question: "What type of typing does Python use?",
          options: [
            "A) Static typing",
            "B) Dynamic typing",
            "C) Strong typing only",
            "D) No typing system"
          ],
          correctAnswer: "B"
        },
        {
          question: "Which library is commonly used for data analysis in Python?",
          options: [
            "A) jQuery",
            "B) Pandas",
            "C) Bootstrap",
            "D) Express"
          ],
          correctAnswer: "B"
        },
        {
          question: "What does Python emphasize in its design?",
          options: [
            "A) Speed over readability",
            "B) Complexity and power",
            "C) Code readability and simplicity",
            "D) Minimal documentation"
          ],
          correctAnswer: "C"
        },
        {
          question: "Which of these is a machine learning framework for Python?",
          options: [
            "A) TensorFlow",
            "B) Laravel",
            "C) Spring",
            "D) .NET"
          ],
          correctAnswer: "A"
        },
        {
          question: "What is Python's level of abstraction?",
          options: [
            "A) Low-level language",
            "B) Assembly language",
            "C) High-level language",
            "D) Machine code"
          ],
          correctAnswer: "C"
        }
      ]
    };

    console.log("📊 Sending response with", response.quiz.length, "quiz questions");
    res.json(response);

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ 
      error: error.message || "An error occurred during analysis"
    });
  }
});

app.get("/", (req, res) => {
  res.send("YouTube Learning Assistant API - Demo Mode ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Demo Server running on port ${PORT}`);
  console.log(`ℹ️  Running in DEMO MODE (no OpenAI API required)`);
});

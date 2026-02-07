import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
      setDarkMode(true);
    }
  }, []);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`${type} copied to clipboard!`);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  const exportResults = () => {
    if (!result) return;
    
    let content = `YouTube Learning Assistant - Analysis Results\n\n`;
    content += `=== SUMMARY ===\n${result.summary}\n\n`;
    content += `=== KEY POINTS ===\n`;
    result.keyPoints?.forEach((point, i) => {
      content += `${i + 1}. ${point}\n`;
    });
    content += `\n=== QUIZ ===\n`;
    result.quiz?.forEach((q, i) => {
      content += `\nQ${i + 1}: ${q.question}\n`;
      q.options.forEach(opt => content += `  ${opt}\n`);
      content += `  Correct Answer: ${q.correctAnswer}\n`;
    });
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'learning-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const printResults = () => {
    window.print();
  };

  const extractVideoId = (url) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const getVideoThumbnail = (url) => {
    const videoId = extractVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
  };

  const handleSubmit = async () => {
    if (!url.trim()) {
      setError("Please enter a YouTube URL");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setSelectedAnswers({});
    setShowResults(false);

    try {
      const res = await fetch("https://smart-video-learning-assistant.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze video");
      }

      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer
    });
  };

  const handleSubmitQuiz = () => {
    // Check if all questions are answered
    const totalQuestions = result?.quiz?.length || 0;
    const answeredQuestions = Object.keys(selectedAnswers).length;
    
    if (answeredQuestions < totalQuestions) {
      alert(`Please answer all questions! You've answered ${answeredQuestions} out of ${totalQuestions} questions.`);
      return;
    }
    
    setShowResults(true);
  };

  const calculateScore = () => {
    if (!result?.quiz) return 0;
    let correct = 0;
    result.quiz.forEach((q, index) => {
      // Handle both correct_answer and correctAnswer formats from backend
      const correctAnswer = q.correct_answer || q.correctAnswer;
      if (selectedAnswers[index] === correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      {/* Animated Video Background */}
      <div className="video-background">
        <div className="gradient-overlay"></div>
      </div>

      <div className="container">
        {/* Theme Toggle Only */}
        <div className="top-controls">
          <button className="theme-toggle" onClick={toggleDarkMode} title="Toggle Dark Mode">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <header className="header">
          <h1>🎓 YouTube Learning Assistant</h1>
          <p className="subtitle">Transform any educational video into a complete learning package</p>
        </header>

        <div className="input-section">
          <input
            type="text"
            className="url-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube URL (e.g., https://www.youtube.com/watch?v=...)"
            disabled={loading}
          />
          <button 
            className="submit-btn" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Video"}
          </button>
        </div>

        {error && (
          <div className="error-box">
            <div className="error-icon">⚠️</div>
            <div className="error-content">
              <strong>Oops! Something went wrong</strong>
              <p>{error}</p>
              <div className="error-suggestions">
                <p><strong>Try these solutions:</strong></p>
                <ul>
                  <li>✓ Make sure the video URL is correct</li>
                  <li>✓ Check if the video is public (not private)</li>
                  <li>✓ Verify your internet connection</li>
                  <li>✓ Try a different video</li>
                </ul>
              </div>
              <button onClick={() => setError('')} className="dismiss-btn">Dismiss</button>
            </div>
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="loading-animation">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="loading-icon">🤖</div>
            </div>
            <h3 className="loading-title">Analyzing Your Video...</h3>
            <div className="loading-steps">
              <div className="step active">
                <span className="step-icon">1️⃣</span>
                <span>Extracting video metadata</span>
              </div>
              <div className="step">
                <span className="step-icon">2️⃣</span>
                <span>Processing with AI</span>
              </div>
              <div className="step">
                <span className="step-icon">3️⃣</span>
                <span>Generating learning materials</span>
              </div>
            </div>
            <p className="loading-tip">💡 Tip: This usually takes 15-30 seconds</p>
          </div>
        )}

        {result && (
          <div className="results">
            {/* Video Info Card */}
            <div className="video-info-card">
              <div className="video-thumbnail">
                <img src={getVideoThumbnail(url)} alt="Video thumbnail" />
                <div className="video-badge">✓ Analyzed</div>
              </div>
              <div className="video-details">
                <h3>📹 Video Analysis Complete</h3>
                <div className="action-buttons">
                  <button onClick={() => copyToClipboard(result.summary + '\n\n' + result.keyPoints?.join('\n'), 'Results')} className="action-btn">
                    📋 Copy All
                  </button>
                  <button onClick={exportResults} className="action-btn">
                    💾 Download
                  </button>
                  <button onClick={printResults} className="action-btn">
                    🖨️ Print
                  </button>
                  <button onClick={() => setResult(null)} className="action-btn danger">
                    🔄 New Analysis
                  </button>
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <section className="result-section summary-section">
              <div className="section-header">
                <h2>📝 Summary</h2>
                <button onClick={() => copyToClipboard(result.summary, 'Summary')} className="copy-btn" title="Copy summary">
                  📋 Copy
                </button>
              </div>
              <div className="content-box">
                <p>{result.summary}</p>
                <div className="word-count">{result.summary?.split(' ').length || 0} words</div>
              </div>
            </section>

            {/* Key Points Section */}
            <section className="result-section keypoints-section">
              <div className="section-header">
                <h2>💡 Key Learning Points</h2>
                <button onClick={() => copyToClipboard(result.keyPoints?.join('\n'), 'Key Points')} className="copy-btn" title="Copy key points">
                  📋 Copy
                </button>
              </div>
              <div className="content-box">
                <ul className="key-points">
                  {result.keyPoints?.map((point, index) => (
                    <li key={index}>
                      <span className="point-number">{index + 1}</span>
                      <span className="point-text">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Quiz Section */}
            <section className="result-section quiz-section">
              <div className="section-header">
                <h2>📋 Quiz ({result.quiz?.length || 0} Questions)</h2>
                {!showResults && (
                  <div className="quiz-progress">
                    <span>{Object.keys(selectedAnswers).length} / {result.quiz?.length || 0} answered</span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{width: `${(Object.keys(selectedAnswers).length / (result.quiz?.length || 1)) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="quiz-container">
                {result.quiz?.map((question, qIndex) => (
                  <div key={qIndex} className="question-card">
                    <h3 className="question-number">Question {qIndex + 1}</h3>
                    <p className="question-text">{question.question}</p>
                    
                    <div className="options">
                      {question.options.map((option, oIndex) => {
                        const optionLetter = option.charAt(0);
                        const correctAnswer = question.correct_answer || question.correctAnswer;
                        const isSelected = selectedAnswers[qIndex] === optionLetter;
                        const isCorrect = correctAnswer === optionLetter;
                        
                        let optionClass = "option";
                        if (showResults) {
                          if (isCorrect) {
                            optionClass += " correct";
                          } else if (isSelected && !isCorrect) {
                            optionClass += " incorrect";
                          }
                        } else if (isSelected) {
                          optionClass += " selected";
                        }

                        return (
                          <div
                            key={oIndex}
                            className={optionClass}
                            onClick={() => !showResults && handleAnswerSelect(qIndex, optionLetter)}
                          >
                            {option}
                            {showResults && isCorrect && <span className="icon">✓</span>}
                            {showResults && isSelected && !isCorrect && <span className="icon">✗</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {!showResults && result.quiz?.length > 0 && (
                <button 
                  className="submit-quiz-btn" 
                  onClick={handleSubmitQuiz}
                  style={{
                    opacity: Object.keys(selectedAnswers).length === result.quiz?.length ? 1 : 0.6,
                    cursor: Object.keys(selectedAnswers).length === result.quiz?.length ? 'pointer' : 'not-allowed'
                  }}
                >
                  Submit Quiz {Object.keys(selectedAnswers).length < result.quiz?.length && 
                    `(${Object.keys(selectedAnswers).length}/${result.quiz?.length} answered)`}
                </button>
              )}

              {showResults && (
                <div className="quiz-results">
                  <div className="score-card">
                    <div className="score-circle">
                      <svg width="120" height="120">
                        <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="8"/>
                        <circle 
                          cx="60" 
                          cy="60" 
                          r="54" 
                          fill="none" 
                          stroke="#667eea" 
                          strokeWidth="8"
                          strokeDasharray={`${(calculateScore() / (result.quiz?.length || 1)) * 339.292} 339.292`}
                          strokeLinecap="round"
                          transform="rotate(-90 60 60)"
                        />
                      </svg>
                      <div className="score-text">
                        <span className="score-number">{calculateScore()}</span>
                        <span className="score-total">/{result.quiz?.length || 0}</span>
                      </div>
                    </div>
                    <div className="score-details">
                      <h3>Quiz Complete!</h3>
                      <p className="score-percentage">
                        {((calculateScore() / (result.quiz?.length || 1)) * 100).toFixed(0)}% Correct
                      </p>
                      <div className="score-breakdown">
                        <div className="stat">
                          <span className="stat-label">Correct</span>
                          <span className="stat-value correct">✓ {calculateScore()}</span>
                        </div>
                        <div className="stat">
                          <span className="stat-label">Incorrect</span>
                          <span className="stat-value incorrect">✗ {(result.quiz?.length || 0) - calculateScore()}</span>
                        </div>
                        <div className="stat">
                          <span className="stat-label">Performance</span>
                          <span className="stat-value">
                            {((calculateScore() / (result.quiz?.length || 1)) * 100) >= 90 ? '🌟 Excellent' :
                             ((calculateScore() / (result.quiz?.length || 1)) * 100) >= 70 ? '👍 Good' :
                             ((calculateScore() / (result.quiz?.length || 1)) * 100) >= 50 ? '📚 Fair' : '📖 Needs Review'}
                          </span>
                        </div>
                      </div>
                      <button onClick={() => {setShowResults(false); setSelectedAnswers({});}} className="retry-btn">
                        🔄 Retry Quiz
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Transcript Section */}
            <section className="result-section">
              <h2>📄 Full Transcript</h2>
              <div className="content-box transcript">
                <p>{result.transcript}</p>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

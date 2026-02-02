const { YoutubeTranscript } = require("youtube-transcript");

async function testWithVideoId() {
  console.log("Testing with video ID directly...\n");
  
  // Try different formats
  const tests = [
    { format: "Full URL", value: "https://www.youtube.com/watch?v=8JJ101D3knE" },
    { format: "Video ID only", value: "8JJ101D3knE" },
    { format: "Different video", value: "HXV3zeQKqGY" },
  ];

  for (const test of tests) {
    console.log(`\nTrying ${test.format}: ${test.value}`);
    try {
      const transcript = await YoutubeTranscript.fetchTranscript(test.value);
      console.log(`✅ Got ${transcript.length} entries`);
      
      if (transcript.length > 0) {
        const text = transcript.slice(0, 3).map(t => t.text).join(" ");
        console.log(`Sample text: "${text}"`);
        break;
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  }
}

testWithVideoId();

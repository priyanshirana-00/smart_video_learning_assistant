const { YoutubeTranscript } = require("youtube-transcript");

async function testMultipleVideos() {
  const testVideos = [
    "https://www.youtube.com/watch?v=8JJ101D3knE", // Programming tutorial
    "https://www.youtube.com/watch?v=HXV3zeQKqGY", // SQL tutorial  
    "https://www.youtube.com/watch?v=vLnPwxZdW4Y", // Computer science
  ];

  for (const url of testVideos) {
    console.log("\n" + "=".repeat(60));
    console.log("Testing:", url);
    console.log("=".repeat(60));
    
    try {
      const transcript = await YoutubeTranscript.fetchTranscript(url);
      
      if (!transcript || transcript.length === 0) {
        console.log("❌ No transcript available");
        continue;
      }
      
      const fullText = transcript.map(item => item.text).join(" ");
      console.log("✅ SUCCESS!");
      console.log("Transcript entries:", transcript.length);
      console.log("Total characters:", fullText.length);
      console.log("\nFirst 300 characters:");
      console.log(fullText.substring(0, 300) + "...");
      
      // This one works, so break
      console.log("\n🎉 Found a working video!");
      console.log("Use this URL for testing:", url);
      break;
      
    } catch (error) {
      console.log("❌ ERROR:", error.message);
    }
  }
}

testMultipleVideos();

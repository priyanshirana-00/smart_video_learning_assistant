const { YoutubeTranscript } = require("youtube-transcript");

async function testTranscript() {
  try {
    console.log("Testing YouTube transcript extraction...");
    const url = "https://www.youtube.com/watch?v=rfscVS0vtbw";
    
    console.log("URL:", url);
    console.log("Fetching transcript...");
    
    const transcript = await YoutubeTranscript.fetchTranscript(url);
    
    console.log("\n✅ SUCCESS!");
    console.log("Transcript items:", transcript.length);
    console.log("\nFirst 3 entries:");
    console.log(transcript.slice(0, 3));
    
    const fullText = transcript.map(item => item.text).join(" ");
    console.log("\nFull transcript length:", fullText.length, "characters");
    console.log("\nFirst 200 characters:");
    console.log(fullText.substring(0, 200));
    
  } catch (error) {
    console.error("\n❌ ERROR:", error.message);
  }
}

testTranscript();

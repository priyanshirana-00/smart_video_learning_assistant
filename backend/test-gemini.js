// Quick test to verify Gemini model is working
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function testGemini() {
  try {
    console.log("Testing Gemini API...");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    
    console.log("Sending test prompt...");
    const result = await model.generateContent("Say 'Hello, I am working!' in a friendly way.");
    const response = await result.response;
    const text = response.text();
    
    console.log("\n✅ SUCCESS! Gemini responded:");
    console.log(text);
    console.log("\n✅ Model is working correctly!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ ERROR:", error.message);
    console.error("\nFull error:", error);
    process.exit(1);
  }
}

testGemini();

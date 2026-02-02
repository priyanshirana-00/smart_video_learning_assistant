// List available Gemini models
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function listModels() {
  try {
    console.log("Listing available Gemini models...\n");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Try to list models
    const models = await genAI.listModels();
    
    console.log("Available models:");
    for (const model of models) {
      console.log(`- ${model.name}`);
      if (model.supportedGenerationMethods) {
        console.log(`  Methods: ${model.supportedGenerationMethods.join(', ')}`);
      }
    }
  } catch (error) {
    console.error("\n❌ ERROR:", error.message);
    console.log("\nTrying manual API call...");
    
    // Try direct API call
    const fetch = require('node-fetch');
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.models) {
        console.log("\n✅ Available models from API:");
        data.models.forEach(model => {
          if (model.supportedGenerationMethods && model.supportedGenerationMethods.includes('generateContent')) {
            console.log(`\n- ${model.name}`);
            console.log(`  Display Name: ${model.displayName}`);
            console.log(`  Methods: ${model.supportedGenerationMethods.join(', ')}`);
          }
        });
      } else {
        console.log("Response:", JSON.stringify(data, null, 2));
      }
    } catch (fetchError) {
      console.error("Fetch error:", fetchError.message);
    }
  }
}

listModels();

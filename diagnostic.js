// Diagnostic tool - paste this in browser console to check configuration
// Run this in your deployed app's browser console to diagnose issues

(function() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🔍 YOUTUBE LEARNING ASSISTANT - DIAGNOSTIC TOOL');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  
  // Check runtime config
  console.log('1️⃣  RUNTIME CONFIGURATION (config.js)');
  console.log('   window.APP_CONFIG:', window.APP_CONFIG);
  if (window.APP_CONFIG && window.APP_CONFIG.API_URL) {
    console.log('   ✅ Runtime config loaded');
    console.log('   📍 API_URL:', window.APP_CONFIG.API_URL);
  } else {
    console.log('   ⚠️  Runtime config NOT loaded or missing API_URL');
  }
  console.log('');
  
  // Check build-time env
  console.log('2️⃣  BUILD-TIME ENVIRONMENT VARIABLE');
  if (process && process.env && process.env.REACT_APP_API_URL) {
    console.log('   ✅ Environment variable set');
    console.log('   📍 REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
  } else {
    console.log('   ⚠️  Environment variable NOT set');
  }
  console.log('');
  
  // Determine which URL will be used
  console.log('3️⃣  FINAL API URL TO BE USED');
  const apiUrl = 
    (window.APP_CONFIG && window.APP_CONFIG.API_URL) ||
    (process && process.env && process.env.REACT_APP_API_URL) || 
    "http://localhost:5000";
  console.log('   📍 Using:', apiUrl);
  console.log('   📍 Full endpoint:', apiUrl + '/analyze');
  console.log('');
  
  // Test backend connectivity
  console.log('4️⃣  TESTING BACKEND CONNECTIVITY');
  console.log('   Testing:', apiUrl);
  
  fetch(apiUrl + '/')
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    })
    .then(text => {
      console.log('   ✅ Backend is reachable!');
      console.log('   📝 Response:', text);
    })
    .catch(error => {
      console.log('   ❌ Cannot reach backend');
      console.log('   📝 Error:', error.message);
      
      if (error.message.includes('Failed to fetch')) {
        console.log('   💡 Possible causes:');
        console.log('      - Backend server is not running');
        console.log('      - Backend URL is incorrect');
        console.log('      - CORS is blocking the request');
        console.log('      - Network connectivity issue');
      }
    });
  
  console.log('');
  console.log('5️⃣  EXPECTED CONFIGURATION');
  console.log('   Frontend: https://smart-video-learning-assistant-1.onrender.com');
  console.log('   Backend:  https://smart-video-learning-assistant.onrender.com');
  console.log('');
  
  console.log('6️⃣  RECOMMENDATIONS');
  if (!window.APP_CONFIG || !window.APP_CONFIG.API_URL) {
    console.log('   ⚠️  config.js not loaded - check if file exists in build');
  }
  if (apiUrl === 'http://localhost:5000') {
    console.log('   ⚠️  Using localhost - you need to set API URL in config.js or env var');
  }
  if (apiUrl && !apiUrl.includes('smart-video-learning-assistant.onrender.com')) {
    console.log('   ⚠️  API URL might be incorrect - should be smart-video-learning-assistant.onrender.com');
  }
  
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('📚 For more help, see RUNTIME_CONFIG_SOLUTION.md');
  console.log('═══════════════════════════════════════════════════════════');
})();

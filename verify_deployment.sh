#!/bin/bash

# Script to verify if the deployed frontend is using the new code

FRONTEND_URL="https://smart-video-learning-assistant-1.onrender.com"

echo "════════════════════════════════════════════════════════════"
echo "🔍 Verifying Deployed Frontend Code"
echo "════════════════════════════════════════════════════════════"
echo ""

echo "1️⃣  Checking if frontend is accessible..."
echo "   URL: $FRONTEND_URL"
echo ""

response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" "$FRONTEND_URL")
http_status=$(echo "$response" | grep "HTTP_STATUS:" | cut -d: -f2)
body=$(echo "$response" | sed '/HTTP_STATUS:/d')

if [ "$http_status" = "200" ]; then
    echo "   ✅ Frontend is accessible (Status: $http_status)"
else
    echo "   ❌ Frontend returned status: $http_status"
    exit 1
fi

echo ""
echo "2️⃣  Checking for config.js file..."
config_response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" "$FRONTEND_URL/config.js")
config_status=$(echo "$config_response" | grep "HTTP_STATUS:" | cut -d: -f2)

if [ "$config_status" = "200" ]; then
    echo "   ✅ config.js is present"
    config_content=$(echo "$config_response" | sed '/HTTP_STATUS:/d')
    echo "   Content preview:"
    echo "$config_content" | head -5 | sed 's/^/   /'
else
    echo "   ❌ config.js not found (Status: $config_status)"
    echo "   This means the OLD code is deployed!"
fi

echo ""
echo "3️⃣  Checking for updated files..."

# Check if index.html contains the config.js script tag
index_html=$(curl -s "$FRONTEND_URL")
if echo "$index_html" | grep -q "config.js"; then
    echo "   ✅ index.html loads config.js - NEW CODE"
else
    echo "   ❌ index.html does NOT load config.js - OLD CODE"
fi

echo ""
echo "════════════════════════════════════════════════════════════"
echo "📊 VERDICT:"
echo "════════════════════════════════════════════════════════════"

if [ "$config_status" = "200" ] && echo "$index_html" | grep -q "config.js"; then
    echo ""
    echo "✅ NEW CODE IS DEPLOYED!"
    echo ""
    echo "The deployed app includes:"
    echo "  - config.js runtime configuration"
    echo "  - Updated App.js with /analyze endpoint"
    echo "  - Enhanced error handling"
    echo ""
    echo "If you're still getting 404 errors:"
    echo "  1. Hard refresh browser (Ctrl+Shift+R)"
    echo "  2. Clear browser cache"
    echo "  3. Try incognito/private mode"
    echo "  4. Check browser console for detailed logs"
    echo ""
else
    echo ""
    echo "❌ OLD CODE IS STILL DEPLOYED!"
    echo ""
    echo "Action required:"
    echo "  1. Go to Render Dashboard"
    echo "  2. Select: smart-video-learning-assistant-1"
    echo "  3. Click: Manual Deploy → Clear build cache & deploy"
    echo "  4. Wait for build to complete (5-10 minutes)"
    echo "  5. Run this script again to verify"
    echo ""
    echo "See MUST_REDEPLOY.md for detailed instructions"
    echo ""
fi

echo "════════════════════════════════════════════════════════════"

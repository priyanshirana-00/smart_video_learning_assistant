#!/bin/bash

# Test script to verify backend API is working

BACKEND_URL="https://smart-video-learning-assistant.onrender.com"

echo "=================================================="
echo "Testing Backend API"
echo "=================================================="
echo ""

echo "1. Testing GET / endpoint..."
echo "   URL: $BACKEND_URL/"
echo ""

response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" "$BACKEND_URL/")
http_status=$(echo "$response" | grep "HTTP_STATUS:" | cut -d: -f2)
body=$(echo "$response" | sed '/HTTP_STATUS:/d')

echo "   Response: $body"
echo "   Status: $http_status"
echo ""

if [ "$http_status" = "200" ]; then
    echo "   ✅ Backend is running!"
else
    echo "   ❌ Backend returned status: $http_status"
fi

echo ""
echo "=================================================="
echo "2. Testing POST /analyze endpoint..."
echo "   URL: $BACKEND_URL/analyze"
echo ""

# Test with a sample YouTube URL
test_data='{"url":"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'

response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -H "Origin: https://smart-video-learning-assistant-1.onrender.com" \
    -d "$test_data" \
    "$BACKEND_URL/analyze")

http_status=$(echo "$response" | grep "HTTP_STATUS:" | cut -d: -f2)
body=$(echo "$response" | sed '/HTTP_STATUS:/d')

echo "   Status: $http_status"

if [ "$http_status" = "200" ]; then
    echo "   ✅ /analyze endpoint is working!"
    echo "   Response preview:"
    echo "$body" | head -20
elif [ "$http_status" = "404" ]; then
    echo "   ❌ 404 - Endpoint not found!"
    echo "   This means the endpoint doesn't exist on the backend."
elif [ "$http_status" = "500" ]; then
    echo "   ⚠️  500 - Server error (endpoint exists but failed)"
    echo "   Response: $body"
else
    echo "   Status: $http_status"
    echo "   Response: $body"
fi

echo ""
echo "=================================================="
echo "Summary"
echo "=================================================="
echo ""
echo "Backend URL: $BACKEND_URL"
echo "Frontend URL: https://smart-video-learning-assistant-1.onrender.com"
echo ""
echo "If you see 404 errors, make sure:"
echo "1. Backend is deployed and running"
echo "2. Frontend has REACT_APP_API_URL set in Render dashboard"
echo "3. Frontend has been rebuilt after setting the variable"
echo ""

# Deployment Guide

## Frontend Deployment (Render/Netlify/Vercel)

### Environment Variables Required
Set the following environment variable in your deployment platform:
```
REACT_APP_API_URL=https://smart-video-learning-assistant.onrender.com
```

### Build Settings
- **Build Command**: `npm run build`
- **Publish Directory**: `build`
- **Node Version**: 18.x or higher

### Important Files
- `.env.production` - Contains production API URL (already configured)
- `.env.development` - Contains local development API URL
- `public/_redirects` - Ensures SPA routing works correctly

## Backend Deployment (Render)

### Environment Variables Required
Set the following environment variables:
```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

### Optional Environment Variables
```
ALLOWED_ORIGINS=https://your-frontend.com,https://www.your-frontend.com
```
If not set, defaults to the pre-configured origins in the code.

### Build Settings
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Node Version**: 18.x or higher

## CORS Configuration
The backend is configured to accept requests from:
- `https://smart-video-learning-assistant-1.onrender.com`
- `https://smart-video-learning-assistant.onrender.com`
- `http://localhost:3000`
- `http://localhost:3001`

If your frontend is deployed to a different URL, update the `allowedOrigins` array in `backend/server.js`.

## Testing Locally

### Start Backend
```bash
cd backend
npm install
# Create .env file with GEMINI_API_KEY
npm start
# Server runs on http://localhost:5000
```

### Start Frontend
```bash
cd frontend
npm install
npm start
# App runs on http://localhost:3000
```

## Troubleshooting

### 404 Error
- ✅ Ensure frontend is using the correct API URL (check `.env.production`)
- ✅ Verify backend is deployed and accessible
- ✅ Check that `_redirects` file is in the build output
- ✅ Confirm CORS is configured for your frontend URL

### CORS Error
- Update `allowedOrigins` in `backend/server.js` to include your frontend URL
- Redeploy the backend after making changes

### Environment Variables Not Working
- Ensure `.env.production` has the correct API URL
- In Render/Netlify, manually set `REACT_APP_API_URL` in the dashboard
- Rebuild and redeploy the frontend

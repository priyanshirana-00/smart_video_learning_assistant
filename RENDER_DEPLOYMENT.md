# Frontend Deployment Configuration

## IMPORTANT: Setting the Backend URL

The frontend needs to know where the backend API is located. There are two ways to configure this:

### Option 1: Environment Variable (RECOMMENDED for Render)

In your Render dashboard for the frontend service:

1. Go to your frontend service settings
2. Add an environment variable:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://smart-video-learning-assistant.onrender.com`

3. Trigger a manual deploy or redeploy

### Option 2: Edit .env.production file

The `.env.production` file in the frontend folder already contains:
```
REACT_APP_API_URL=https://smart-video-learning-assistant.onrender.com
```

This should work if your deployment platform picks up `.env` files during build.

## Current Configuration

Based on your deployment:
- **Frontend URL**: https://smart-video-learning-assistant-1.onrender.com
- **Backend URL**: https://smart-video-learning-assistant.onrender.com

The frontend `.env.production` is already configured with the correct backend URL.

## Troubleshooting 404 Errors

If you're still getting 404 errors, it's likely because:

1. **Frontend not rebuilt**: The frontend needs to be rebuilt with the new code
2. **Environment variable not set**: Render might not be picking up `.env.production`
3. **Cache issue**: Browser or CDN caching old version

### Solution Steps:

1. **Set environment variable in Render Dashboard**:
   - Go to: Render Dashboard → Your Frontend Service → Environment
   - Add: `REACT_APP_API_URL` = `https://smart-video-learning-assistant.onrender.com`
   - Save and trigger a new deploy

2. **Clear browser cache**:
   - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
   - Or open in incognito/private mode

3. **Verify the build**:
   - Check Render build logs to see if environment variables are loaded
   - The build should show: "Creating an optimized production build..."

## Verify It's Working

After redeploying:

1. Open browser DevTools (F12)
2. Go to Network tab
3. Try to analyze a video
4. Check the request:
   - Should be: `POST https://smart-video-learning-assistant.onrender.com/analyze`
   - Should return: Status 200 (not 404)

## Alternative: Hardcode the URL (Not Recommended)

If environment variables aren't working, you can temporarily hardcode the URL in `App.js`:

```javascript
// Line 98 in App.js
const apiUrl = "https://smart-video-learning-assistant.onrender.com";
```

But this is NOT recommended for production. Use environment variables instead.

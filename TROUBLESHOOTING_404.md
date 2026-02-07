# 🔧 TROUBLESHOOTING 404 ERROR

## Your Configuration
- **Frontend URL**: `https://smart-video-learning-assistant-1.onrender.com`
- **Backend URL**: `https://smart-video-learning-assistant.onrender.com`

## ✅ What's Already Configured

1. ✅ Frontend code uses environment variable
2. ✅ `.env.production` has correct backend URL
3. ✅ Backend CORS allows frontend URL
4. ✅ Backend `/analyze` endpoint exists
5. ✅ `_redirects` file for SPA routing

## ❌ Why You're Still Getting 404

The most likely reason is: **React environment variables are not being loaded during the build**

### How React Environment Variables Work

React (create-react-app) embeds environment variables at **BUILD TIME**, not runtime:

```
npm run build  ← Environment variables are read HERE
                 and embedded into the JavaScript bundle

npm start (production) ← Environment variables are NOT read here
```

This means:
1. `.env.production` is only read during `npm run build`
2. The variable is baked into the JavaScript bundle
3. Render must set the variable BEFORE building

## 🚀 SOLUTION: Set Environment Variable in Render Dashboard

### Step-by-Step Instructions:

1. **Go to Render Dashboard**
   - Navigate to: https://dashboard.render.com

2. **Select Your Frontend Service**
   - Click on: `smart-video-learning-assistant-1`

3. **Go to Environment Tab**
   - Click "Environment" in the left sidebar

4. **Add Environment Variable**
   - Click "Add Environment Variable"
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://smart-video-learning-assistant.onrender.com`
   - Click "Save Changes"

5. **Trigger Manual Deploy**
   - Go to "Manual Deploy" section
   - Click "Clear build cache & deploy"
   - Wait for build to complete (5-10 minutes)

### Verify Environment Variable is Set

Check the build logs in Render. You should see something like:
```
Creating an optimized production build...
Environment variables:
  REACT_APP_API_URL=https://smart-video-learning-assistant.onrender.com
```

## 🔍 How to Debug After Redeployment

1. **Open Your Frontend**: `https://smart-video-learning-assistant-1.onrender.com`

2. **Open Browser DevTools** (Press F12)

3. **Go to Console Tab**

4. **Try to Analyze a Video**

5. **Check Console Output**:
   You should see:
   ```
   API URL being used: https://smart-video-learning-assistant.onrender.com
   Environment: production
   Full API endpoint: https://smart-video-learning-assistant.onrender.com/analyze
   ```

6. **Go to Network Tab**

7. **Check the Request**:
   - Look for: `POST /analyze`
   - URL should be: `https://smart-video-learning-assistant.onrender.com/analyze`
   - Status should be: `200 OK` (not 404)

## 🐛 If Still Getting 404

### Check 1: Is the request going to the right URL?

**Open Network tab** and check the request URL:

❌ **WRONG**: 
- `https://smart-video-learning-assistant-1.onrender.com/analyze` (frontend URL)
- `http://localhost:5000/analyze` (localhost fallback)

✅ **CORRECT**: 
- `https://smart-video-learning-assistant.onrender.com/analyze` (backend URL)

### Check 2: Is the backend running?

Test the backend directly:
```bash
curl https://smart-video-learning-assistant.onrender.com/
```

Should return: "Backend is running"

### Check 3: Is environment variable loaded?

In browser console, you should see:
```
API URL being used: https://smart-video-learning-assistant.onrender.com
```

If you see `http://localhost:5000`, the environment variable is NOT loaded.

### Check 4: Clear cache

Hard refresh the page:
- Chrome/Firefox: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
- Safari: `Cmd + Option + R`
- Or use Incognito/Private mode

## 🔄 Alternative Quick Fix (Not Recommended)

If environment variables don't work, temporarily hardcode the URL:

Edit `frontend/src/App.js` line 98:
```javascript
// Temporary hardcoded URL
const apiUrl = "https://smart-video-learning-assistant.onrender.com";
```

Then commit, push, and redeploy. But **use environment variables for production**.

## 📞 Still Need Help?

If none of the above works:

1. **Check Render Build Logs**
   - Go to your frontend service in Render
   - Click on the latest deploy
   - Look for errors in the build log

2. **Check Backend Logs**
   - Go to your backend service in Render
   - Check if requests are arriving
   - Look for CORS errors

3. **Share Screenshots**
   - Browser console output
   - Network tab showing the failed request
   - Render build logs

## 📝 Summary Checklist

Before marking this as resolved, verify:

- [ ] Set `REACT_APP_API_URL` in Render dashboard
- [ ] Cleared build cache and redeployed frontend
- [ ] Waited for build to complete (check build logs)
- [ ] Cleared browser cache / used incognito
- [ ] Opened browser console to check API URL
- [ ] Checked Network tab - request goes to correct URL
- [ ] Request returns 200 OK (not 404)
- [ ] Can successfully analyze a YouTube video

Once ALL items are checked, the 404 error should be resolved!

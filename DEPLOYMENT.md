# SmartList Deployment Guide

## Backend Deployment (Render.com)

### 1. Prepare Repository
```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

### 2. Deploy on Render.com
1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `smartlist-backend`
   - **Environment**: `Docker`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`

### 3. Environment Variables
Add these environment variables in Render dashboard:
```
MONGODB_URI=mongodb+srv://vj:IWG14OY7WClMfVXE@smartlist.t62bq43.mongodb.net/smartlist?retryWrites=true&w=majority&appName=smartlist
PORT=8080
SPRING_PROFILES_ACTIVE=prod
```

### 4. Deploy
- Click "Create Web Service"
- Wait for deployment to complete
- Note your backend URL: `https://smartlist-backend.onrender.com`

## Frontend Deployment (Netlify)

### 1. Update Configuration
Update `frontend/netlify.toml` and replace `your-backend-app.onrender.com` with your actual Render URL.

### 2. Deploy on Netlify
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

### 3. Environment Variables
In Netlify dashboard, add:
```
VITE_API_URL=https://your-actual-render-backend-url.onrender.com
```

### 4. Deploy
- Click "Deploy site"
- Your frontend will be available at: `https://your-app-name.netlify.app`

## Keep-Alive Service Setup

### Option 1: Use UptimeRobot (Recommended)
1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Create a free account
3. Add a new monitor:
   - **Type**: HTTP(s)
   - **URL**: `https://your-backend-url.onrender.com/api/health`
   - **Monitoring Interval**: 5 minutes
4. Save and activate

### Option 2: Deploy Keep-Alive Service
1. Deploy `keep-alive-service.js` to a free Node.js hosting service
2. Update the URL in the script to your actual backend URL
3. Run the service 24/7

## Testing Deployment

### 1. Test Backend
```bash
curl https://your-backend-url.onrender.com/api/health
```

### 2. Test Frontend
Visit your Netlify URL and ensure all functionality works.

## Troubleshooting

### Backend Issues
- Check Render logs for errors
- Verify environment variables are set correctly
- Ensure MongoDB connection string is valid

### Frontend Issues
- Check browser console for API errors
- Verify VITE_API_URL is set correctly in Netlify
- Check netlify.toml redirects are working

### CORS Issues
If you get CORS errors, update the backend controller to include your actual Netlify URL in the @CrossOrigin annotation.

## Post-Deployment Steps

1. Update README.md with live URLs
2. Test all functionality end-to-end
3. Monitor application performance
4. Set up error monitoring (optional)

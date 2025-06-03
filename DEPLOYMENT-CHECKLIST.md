# 🚀 SmartList Deployment Checklist

## Pre-Deployment Testing

### ✅ Backend Testing
- [ ] Test Docker build locally: `.\test-docker.ps1`
- [ ] Verify health endpoint works: `http://localhost:8080/api/health`
- [ ] Check MongoDB connection
- [ ] Test all API endpoints

### ✅ Frontend Testing  
- [ ] Test production build: `.\test-frontend.ps1`
- [ ] Verify all components render correctly
- [ ] Check API integration works
- [ ] Test responsive design

## 🎯 Render.com Backend Deployment

### Step 1: Repository Setup
```powershell
git add .
git commit -m "Add deployment configuration"
git push origin main
```

### Step 2: Render Configuration
1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"  
3. Connect GitHub repository
4. Configure:
   - **Name**: `smartlist-backend`
   - **Environment**: `Docker`
   - **Region**: Choose closest region
   - **Branch**: `main`
   - **Root Directory**: `backend`

### Step 3: Environment Variables
```
MONGODB_URI=mongodb+srv://vj:IWG14OY7WClMfVXE@smartlist.t62bq43.mongodb.net/smartlist?retryWrites=true&w=majority&appName=smartlist
PORT=8080
SPRING_PROFILES_ACTIVE=prod
```

### Step 4: Deploy & Test
- [ ] Deploy and wait for completion
- [ ] Test health endpoint: `https://your-app.onrender.com/api/health`
- [ ] Copy your backend URL for frontend setup

## 🌐 Netlify Frontend Deployment

### Step 1: Update Configuration
- [ ] Update `frontend/netlify.toml` with your actual Render backend URL
- [ ] Update `frontend/.env.example` if needed

### Step 2: Netlify Configuration
1. Go to [netlify.com](https://netlify.com)
2. "Add new site" → "Import existing project"
3. Connect GitHub repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

### Step 3: Environment Variables
```
VITE_API_URL=https://your-actual-render-url.onrender.com
```

### Step 4: Deploy & Test
- [ ] Deploy and wait for completion
- [ ] Test functionality end-to-end
- [ ] Verify API calls work correctly

## ⏰ Keep-Alive Setup (Render Free Tier)

### Option 1: UptimeRobot (Recommended)
1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Create free account
3. Add HTTP(s) monitor:
   - **URL**: `https://your-backend.onrender.com/api/health`
   - **Interval**: 5 minutes
4. Activate monitoring

### Option 2: Manual Keep-Alive Service
- [ ] Deploy `keep-alive-service.js` to any Node.js hosting
- [ ] Update the URL in the script
- [ ] Ensure it runs 24/7

## 🧪 Post-Deployment Verification

### Backend Checks
- [ ] Health endpoint responds: `/api/health`
- [ ] Lists endpoint works: `/api/lists`
- [ ] CORS headers include Netlify domain
- [ ] Database operations work correctly

### Frontend Checks  
- [ ] Site loads correctly
- [ ] All pages render properly
- [ ] Create/read operations work
- [ ] No console errors
- [ ] Responsive design works

### Integration Checks
- [ ] Frontend can communicate with backend
- [ ] CORS is properly configured
- [ ] Error handling works
- [ ] Loading states display correctly

## 🔧 Troubleshooting

### Common Backend Issues
- **Build fails**: Check Dockerfile and dependencies
- **Health check fails**: Verify MongoDB connection
- **CORS errors**: Update allowed origins in controller

### Common Frontend Issues  
- **Build fails**: Check package.json dependencies
- **API errors**: Verify VITE_API_URL is correct
- **Routing issues**: Check netlify.toml redirects

### Keep-Alive Issues
- **Service sleeps**: Ensure monitoring is active
- **Ping fails**: Check health endpoint accessibility

## 📝 Final Steps

- [ ] Update README.md with live URLs
- [ ] Document any environment-specific configurations
- [ ] Share live URLs with stakeholders
- [ ] Set up error monitoring (optional)
- [ ] Plan for future updates and CI/CD

## 🎉 Success Metrics

Your deployment is successful when:
- ✅ Backend health endpoint returns 200 OK
- ✅ Frontend loads without errors
- ✅ You can create and view lists end-to-end
- ✅ Keep-alive service prevents sleeping
- ✅ All functionality works as expected

---

**Live URLs** (update after deployment):
- 🔗 Frontend: `https://your-app.netlify.app`
- 🔗 Backend: `https://your-backend.onrender.com`
- 🔗 Health Check: `https://your-backend.onrender.com/api/health`

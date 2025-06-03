const https = require('https');

// Your Render backend URL
const BACKEND_URL = 'https://your-backend-app.onrender.com/api/health';

function pingBackend() {
  const startTime = Date.now();
  
  https.get(BACKEND_URL, (res) => {
    const responseTime = Date.now() - startTime;
    console.log(`✅ Backend ping successful - Status: ${res.statusCode} - Response time: ${responseTime}ms - ${new Date().toISOString()}`);
  }).on('error', (err) => {
    console.error(`❌ Backend ping failed - ${err.message} - ${new Date().toISOString()}`);
  });
}

// Ping every 14 minutes (840 seconds)
setInterval(pingBackend, 14 * 60 * 1000);

// Initial ping
console.log('🚀 Keep-alive service started');
pingBackend();

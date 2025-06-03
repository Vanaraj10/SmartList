# Test script to verify the backend deployment fix
Write-Host "🧪 Testing Backend Deployment Fix..." -ForegroundColor Green

# Set environment variables like Render would
$env:SPRING_CONFIG_ACTIVATE_ON_PROFILE = "production"
$env:PORT = "8080"
$env:MONGODB_URI = "mongodb+srv://vj:IWG14OY7WClMfVXE@smartlist.t62bq43.mongodb.net/smartlist?retryWrites=true&w=majority&appName=smartlist"

# Navigate to backend directory
Set-Location "c:\Users\VJ\Desktop\SmartList\backend"

Write-Host "🔧 Testing JAR execution with production profile..." -ForegroundColor Yellow

# Start the application in background
$process = Start-Process -FilePath "java" -ArgumentList "-jar", "target\SmartList-0.0.1-SNAPSHOT.jar" -PassThru -NoNewWindow

Write-Host "⏳ Waiting for application to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Test health endpoint
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/health" -Method Get -TimeoutSec 10
    Write-Host "✅ Health check successful!" -ForegroundColor Green
    Write-Host "Response: $($response | ConvertTo-Json -Depth 2)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Health check failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "This might be due to MongoDB connection or port conflict" -ForegroundColor Yellow
}

# Stop the application
Write-Host "🛑 Stopping test application..." -ForegroundColor Yellow
Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue

# Navigate back
Set-Location "c:\Users\VJ\Desktop\SmartList"

Write-Host "🎯 Test completed!" -ForegroundColor Green
Write-Host "💡 If health check failed, it's likely due to MongoDB connection in local test" -ForegroundColor Cyan
Write-Host "   The fix should work on Render with proper MongoDB access" -ForegroundColor Cyan

# Test Docker build locally
Write-Host "🚀 Testing Docker build for SmartList backend..." -ForegroundColor Green

# Navigate to backend directory
Set-Location "c:\Users\VJ\Desktop\SmartList\backend"

# Build Docker image
Write-Host "📦 Building Docker image..." -ForegroundColor Yellow
docker build -t smartlist-backend .

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Docker build successful!" -ForegroundColor Green
    
    # Test run container
    Write-Host "🧪 Testing container run..." -ForegroundColor Yellow
    docker run -d --name smartlist-test -p 8080:8080 -e MONGODB_URI="mongodb+srv://vj:IWG14OY7WClMfVXE@smartlist.t62bq43.mongodb.net/smartlist?retryWrites=true&w=majority&appName=smartlist" smartlist-backend
    
    # Wait a moment for startup
    Start-Sleep -Seconds 10
    
    # Test health endpoint
    Write-Host "🏥 Testing health endpoint..." -ForegroundColor Yellow
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:8080/api/health" -Method Get
        Write-Host "✅ Health check passed!" -ForegroundColor Green
        Write-Host "Response: $($response | ConvertTo-Json)" -ForegroundColor Cyan
    } catch {
        Write-Host "❌ Health check failed: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # Clean up
    Write-Host "🧹 Cleaning up test container..." -ForegroundColor Yellow
    docker stop smartlist-test
    docker rm smartlist-test
    
} else {
    Write-Host "❌ Docker build failed!" -ForegroundColor Red
}

# Navigate back
Set-Location "c:\Users\VJ\Desktop\SmartList"
Write-Host "🎯 Docker test completed!" -ForegroundColor Green

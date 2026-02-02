# YouTube Learning Assistant - Server Startup Script
Write-Host "Starting YouTube Learning Assistant..." -ForegroundColor Cyan

# Kill any existing node processes to avoid port conflicts
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Start Backend Server
Write-Host "`nStarting Backend Server on port 5000..." -ForegroundColor Yellow
$backend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; Write-Host 'Backend Server' -ForegroundColor Green; npm start" -PassThru

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start Frontend Server  
Write-Host "Starting Frontend Server on port 3000..." -ForegroundColor Yellow
$frontend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; Write-Host 'Frontend Server' -ForegroundColor Green; npm start" -PassThru

Write-Host "`n✅ Both servers are starting!" -ForegroundColor Green
Write-Host "`n📌 Backend API: http://localhost:5000" -ForegroundColor Cyan
Write-Host "📌 Frontend App: http://localhost:3000" -ForegroundColor Cyan
Write-Host "`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

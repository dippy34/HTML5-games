# Nova Hub Server Startup Script
# Run this after restarting your terminal

Write-Host "Starting Nova Hub Server..." -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is available
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Node.js is not found in PATH!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please do one of the following:" -ForegroundColor Yellow
    Write-Host "1. Restart your computer (recommended)" -ForegroundColor White
    Write-Host "2. Restart PowerShell/terminal" -ForegroundColor White
    Write-Host "3. Manually add Node.js to PATH" -ForegroundColor White
    Write-Host ""
    Write-Host "To check if Node.js is installed, run:" -ForegroundColor Yellow
    Write-Host "  winget list OpenJS.NodeJS.LTS" -ForegroundColor White
    exit 1
}

Write-Host "✓ Node.js found: $(node --version)" -ForegroundColor Green
Write-Host "✓ npm found: $(npm --version)" -ForegroundColor Green
Write-Host ""

# Navigate to project directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Check if dependencies are installed
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to install dependencies!" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Dependencies installed!" -ForegroundColor Green
    Write-Host ""
}

# Create .env if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    @"
# Admin Panel Password
ADMIN_PASSWORD=admin

# Server Port
PORT=3000
"@ | Out-File -FilePath ".env" -Encoding utf8
    Write-Host "✓ .env file created" -ForegroundColor Green
    Write-Host ""
}

# Start the server
Write-Host "Starting server on port 3000..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Access Nova Hub at:" -ForegroundColor Green
Write-Host "  Main Site: http://localhost:3000" -ForegroundColor White
Write-Host "  Admin Panel: http://localhost:3000/admin" -ForegroundColor White
Write-Host "  Default Password: admin" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

npm start


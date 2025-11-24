
# Nova Hub Setup Script
# This script will install dependencies and start the server

Write-Host "Nova Hub Setup" -ForegroundColor Cyan
Write-Host "===============" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking for Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js first:" -ForegroundColor Yellow
    Write-Host "1. Go to https://nodejs.org/" -ForegroundColor White
    Write-Host "2. Download the LTS version" -ForegroundColor White
    Write-Host "3. Run the installer" -ForegroundColor White
    Write-Host "4. Restart your terminal and run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "Or install via winget:" -ForegroundColor Yellow
    Write-Host "  winget install OpenJS.NodeJS.LTS" -ForegroundColor White
    exit 1
}

# Check if npm is available
Write-Host "Checking for npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm found: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm is not available!" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to install dependencies!" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Dependencies installed successfully!" -ForegroundColor Green

# Create .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host ""
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    @"
# Admin Panel Password
# Change this to your secure password
ADMIN_PASSWORD=admin

# Server Port (optional, defaults to 3000)
# PORT=3000
"@ | Out-File -FilePath ".env" -Encoding utf8
    Write-Host "✓ .env file created with default password: admin" -ForegroundColor Green
    Write-Host "  ⚠️  Remember to change the password in production!" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To start the server, run:" -ForegroundColor Cyan
Write-Host "  npm start" -ForegroundColor White
Write-Host ""
Write-Host "Then access:" -ForegroundColor Cyan
Write-Host "  Nova Hub: http://localhost:3000" -ForegroundColor White
Write-Host "  Admin Panel: http://localhost:3000/admin" -ForegroundColor White
Write-Host "  Default password: admin" -ForegroundColor Yellow
Write-Host ""


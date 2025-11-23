@echo off
echo Starting Nova Hub Server...
echo.

cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "start-server.ps1"

if errorlevel 1 (
    echo.
    echo Failed to start server. Please check the error messages above.
    pause
)


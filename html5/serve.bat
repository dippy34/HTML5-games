@echo off
REM Launch serve.ps1 with ExecutionPolicy bypass so PowerShell script policy doesn't block it.
SETLOCAL
if "%1"=="" (
  set PORT=8000
) else (
  set PORT=%1
)
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1" -Port %PORT% %*
ENDLOCAL

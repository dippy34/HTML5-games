<#
Simple HTTP server using .NET HttpListener with localhost binding
This version uses localhost+ instead of * to avoid admin requirements
#>
param(
  [int]$Port = 8000,
  [switch]$AutoOpen
)

$ErrorActionPreference = "Stop"

# Add URL reservation for current user (doesn't require admin)
$url = "http://localhost:$Port/"
Write-Host "Attempting to start server on $url"

# Try to reserve the URL for the current user (no admin needed for localhost)
try {
    netsh http add urlacl url=$url user=$env:USERNAME 2>$null
} catch {
    # URL might already be reserved, that's okay
}

$root = (Get-Location).ProviderPath
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add($url)

try {
    $listener.Start()
    Write-Host ""
    Write-Host "✓ Server started successfully!" -ForegroundColor Green
    Write-Host "Serving files from: $root" -ForegroundColor Cyan
    Write-Host "Open http://localhost:$Port/ in your browser" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
    Write-Host ""
    
    if ($AutoOpen) {
        Start-Sleep -Milliseconds 500
        Start-Process "http://localhost:$Port/"
    }
    
    while ($listener.IsListening) {
        try {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response
            
            $rawPath = $request.Url.AbsolutePath.TrimStart('/')
            $urlPath = [System.Uri]::UnescapeDataString($rawPath)
            if ([string]::IsNullOrWhiteSpace($urlPath)) { $urlPath = 'index.html' }
            
            $filePath = Join-Path -Path $root -ChildPath $urlPath
            
            if (Test-Path $filePath -PathType Container) {
                $defaults = @('index.html','index.htm','default.html','default.htm')
                $found = $null
                foreach ($d in $defaults) {
                    $candidate = Join-Path -Path $filePath -ChildPath $d
                    if (Test-Path $candidate -PathType Leaf) { $found = $candidate; break }
                }
                if ($found) { $filePath = $found } else { $filePath = $null }
            }
            
            if ($filePath -and (Test-Path $filePath -PathType Leaf)) {
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentLength64 = $bytes.Length
                
                $mime = 'application/octet-stream'
                switch -Regex ($filePath) {
                    '\.html?$'  { $mime = 'text/html; charset=utf-8' }
                    '\.css$'    { $mime = 'text/css' }
                    '\.js$'     { $mime = 'application/javascript' }
                    '\.png$'    { $mime = 'image/png' }
                    '\.jpe?g$'  { $mime = 'image/jpeg' }
                    '\.gif$'    { $mime = 'image/gif' }
                    '\.svg$'    { $mime = 'image/svg+xml' }
                    '\.json$'   { $mime = 'application/json' }
                    '\.wasm$'   { $mime = 'application/wasm' }
                    '\.mp3$'    { $mime = 'audio/mpeg' }
                    '\.wav$'    { $mime = 'audio/wav' }
                    '\.ogg$'    { $mime = 'audio/ogg' }
                    '\.webm$'   { $mime = 'video/webm' }
                    '\.mp4$'    { $mime = 'video/mp4' }
                    '\.woff2?$' { $mime = 'font/woff' + ($matches[0] -replace '.*','') }
                }
                
                $response.ContentType = $mime
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $tryDir = Join-Path -Path $root -ChildPath $urlPath
                $defaults = @('index.html','index.htm','default.html','default.htm')
                foreach ($d in $defaults) {
                    $candidate = Join-Path -Path $tryDir -ChildPath $d
                    if (Test-Path $candidate -PathType Leaf) { $filePath = $candidate; break }
                }
                
                if ($filePath -and (Test-Path $filePath -PathType Leaf)) {
                    $bytes = [System.IO.File]::ReadAllBytes($filePath)
                    $response.ContentLength64 = $bytes.Length
                    $mime = 'text/html; charset=utf-8'
                    $response.ContentType = $mime
                    $response.OutputStream.Write($bytes, 0, $bytes.Length)
                } else {
                    $response.StatusCode = 404
                    $message = "404 Not Found: $urlPath"
                    $buf = [System.Text.Encoding]::UTF8.GetBytes($message)
                    $response.OutputStream.Write($buf, 0, $buf.Length)
                }
            }
        } catch {
            Write-Host "Error handling request: $_" -ForegroundColor Red
            try {
                $response.StatusCode = 500
                $msg = "500 Internal Server Error"
                $buf = [System.Text.Encoding]::UTF8.GetBytes($msg)
                $response.OutputStream.Write($buf, 0, $buf.Length)
            } catch {}
        } finally {
            try { $response.OutputStream.Close() } catch {}
        }
    }
} catch {
    Write-Host ""
    Write-Host "✗ Error starting server: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Try one of these alternatives:" -ForegroundColor Yellow
    Write-Host "1. Run as Administrator, or" -ForegroundColor Gray
    Write-Host "2. Use a different port: .\serve-simple.ps1 -Port 8080" -ForegroundColor Gray
    Write-Host "3. Open the file directly: Start-Process 'index.html'" -ForegroundColor Gray
    Write-Host ""
    exit 1
} finally {
    if ($listener -and $listener.IsListening) {
        $listener.Stop()
    }
}



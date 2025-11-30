<#
Simple static file server for PowerShell (no Python/Node required).

Usage:
  Run directly (if your policy allows):
    .\serve.ps1 -Port 8000

  Run without changing ExecutionPolicy (recommended if scripts are blocked):
    .\serve.bat 8000
  or
    powershell -NoProfile -ExecutionPolicy Bypass -File .\serve.ps1 -Port 8000

  The repository also provides `serve.bat` / `serve.cmd` which launch this script
  in a temporary PowerShell process with `-ExecutionPolicy Bypass` so you don't
  need to change system policy.

Options:
  -Port <int>         Port to serve on (default 8000)
  -AutoOpen           Open http://localhost:Port in the default browser after start

Examples:
  .\serve.ps1 -Port 8000 -AutoOpen
  .\serve.bat 8000
#>
param(
  [int]$Port = 8000,
  [switch]$AutoOpen
)

$root = (Get-Location).ProviderPath
$listener = [System.Net.HttpListener]::new()
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)
  # Flag used to indicate an intentional stop (Ctrl+C)
  $stopping = $false
  # Register Ctrl+C handler so the server can stop cleanly
  $cancelHandler = {
    param($sender, $e)
    Write-Host "Stopping server (Ctrl+C)..."
    $stopping = $true
    try { if ($listener -and $listener.IsListening) { $listener.Stop() } } catch {}
    # prevent PowerShell from terminating immediately so we can shut down gracefully
    $e.Cancel = $true
  }
  try { [Console]::add_CancelKeyPress($cancelHandler) } catch {}
try {
  $listener.Start()
  Write-Host "Serving files from: $root"
  Write-Host "Open http://localhost:$Port/ in your browser"
  if ($AutoOpen) {
    try { Start-Process "http://localhost:$Port/" } catch {}
  }
  while ($listener.IsListening) {
    try {
      $context = $listener.GetContext()
    } catch {
      # If we're stopping due to Ctrl+C, break the loop gracefully.
      if ($stopping) { break }
      throw
    }
    $request = $context.Request
    $response = $context.Response

    try {
      $rawPath = $request.Url.AbsolutePath.TrimStart('/')
      $urlPath = [System.Uri]::UnescapeDataString($rawPath)
      if ([string]::IsNullOrWhiteSpace($urlPath)) { $urlPath = 'index.html' }

      $filePath = Join-Path -Path $root -ChildPath $urlPath

      # If the path is a directory (e.g. request for /folder/), try common default files
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
          '\.html?$'  { $mime = 'text/html' }
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
        }

        $response.ContentType = $mime
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
      } else {
        # Fallback: try common default files inside the requested path
        $tryDir = Join-Path -Path $root -ChildPath $urlPath
        $defaults = @('index.html','index.htm','default.html','default.htm')
        foreach ($d in $defaults) {
          $candidate = Join-Path -Path $tryDir -ChildPath $d
          if (Test-Path $candidate -PathType Leaf) { $filePath = $candidate; break }
        }

        if ($filePath -and (Test-Path $filePath -PathType Leaf)) {
          $bytes = [System.IO.File]::ReadAllBytes($filePath)
          $response.ContentLength64 = $bytes.Length

          $mime = 'application/octet-stream'
          switch -Regex ($filePath) {
            '\.html?$'  { $mime = 'text/html' }
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
          }

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
      $response.StatusCode = 500
      $msg = "500 Internal Server Error"
      $buf = [System.Text.Encoding]::UTF8.GetBytes($msg)
      $response.OutputStream.Write($buf, 0, $buf.Length)
    } finally {
      $response.OutputStream.Close()
    }
  }
} finally {
  if ($listener -and $listener.IsListening) { $listener.Stop() }
}

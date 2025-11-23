# Fix common game HTML issues
# This script fixes broken DOCTYPEs and script paths in game HTML files

Write-Host "Fixing game HTML files..." -ForegroundColor Cyan

$gamesDir = "html5\load"
$fixedCount = 0
$errorCount = 0

Get-ChildItem -Path $gamesDir -Directory | ForEach-Object {
    $gameDir = $_.FullName
    $indexFile = Join-Path $gameDir "index.html"
    
    if (Test-Path $indexFile) {
        try {
            $content = Get-Content $indexFile -Raw -Encoding UTF8
            $originalContent = $content
            $needsFix = $false
            
            # Fix broken DOCTYPE (starts with 'w' or other characters)
            if ($content -match '^[^<]*<!DOCTYPE') {
                $content = $content -replace '^[^<]*(<!DOCTYPE)', '$1'
                $needsFix = $true
            }
            
            # Remove broken /js/main.js script references
            if ($content -match '/js/main\.js') {
                $content = $content -replace '<script[^>]*src=["'']/js/main\.js["''][^>]*></script>', ''
                $needsFix = $true
            }
            
            # Remove empty script tags
            $content = $content -replace '<script>\s*</script>', ''
            
            if ($needsFix) {
                $content | Set-Content $indexFile -Encoding UTF8 -NoNewline
                $fixedCount++
                Write-Host "  Fixed: $($_.Name)" -ForegroundColor Green
            }
        } catch {
            $errorCount++
            Write-Host "  Error fixing $($_.Name): $_" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "Fixed $fixedCount games" -ForegroundColor Green
if ($errorCount -gt 0) {
    Write-Host "Errors: $errorCount" -ForegroundColor Yellow
}


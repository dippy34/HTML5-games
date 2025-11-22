<#
Compatibility copy: some users type `server.ps1` by mistake — this reuses `serve.ps1`.
This script simply re-invokes `serve.ps1` with bypass execution policy.
Usage: .\server.ps1 -Port 8000
#>
param(
  [int]$Port = 8000,
  [switch]$AutoOpen
)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$serve = Join-Path $scriptDir 'serve.ps1'
if (Test-Path $serve) {
  powershell -NoProfile -ExecutionPolicy Bypass -File $serve -Port $Port @($AutoOpen ? '-AutoOpen' : $null) | Out-Null
} else {
  Write-Error "serve.ps1 not found in $scriptDir"
}

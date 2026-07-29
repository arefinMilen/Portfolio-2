# Redirect npm cache & temp directories to Drive D (to bypass Drive C space limits)
$env:npm_config_cache="d:\npm-cache"
$env:TEMP="d:\temp"
$env:TMP="d:\temp"

if (-not (Test-Path "d:\temp")) {
    New-Item -ItemType Directory -Force -Path "d:\temp" | Out-Null
}

Write-Host "🚀 Launching Samsul Arefin Next.js Portfolio on http://localhost:3000..." -ForegroundColor Cyan
npx next dev

param(
  [string]$Collection = "Ecommerce.baseUrl.fullrunner.max.postman_collection.json",
  [string]$Env = "Ecommerce.baseUrl.environment.json",
  [string]$OutDir = "reports"
)

if (!(Test-Path $OutDir)) { New-Item -ItemType Directory -Path $OutDir | Out-Null }

# Instalar (si hace falta) newman y el reporter HTML
npm ls newman > $null 2>&1
if ($LASTEXITCODE -ne 0) { npm i -D newman | Out-Null }
npm ls newman-reporter-htmlextra > $null 2>&1
if ($LASTEXITCODE -ne 0) { npm i -D newman-reporter-htmlextra | Out-Null }

$reportHtml = Join-Path $OutDir "Ecommerce-api-report.html"
$reportJson = Join-Path $OutDir "Ecommerce-api-report.json"

npx newman run $Collection -e $Env `
  -r cli,htmlextra,json `
  --reporter-htmlextra-export $reportHtml `
  --reporter-htmlextra-title "Ecommerce API Test Report" `
  --reporter-json-export $reportJson `
  --delay-request 200

if ($LASTEXITCODE -ne 0) {
  Write-Host "⚠️  Newman finalizó con errores (ver CLI/HTML)."
}

# Generar Compliance
node scripts/generateCompliance.js $reportJson
#!/usr/bin/env bash
# scripts/run-api-tests.sh
# Ejecuta Newman con reportes HTML y JSON y genera Compliance-Postman.md

COLLECTION="${1:-Ecommerce.baseUrl.fullrunner.max.postman_collection.json}"
ENVFILE="${2:-Ecommerce.baseUrl.environment.json}"
OUTDIR="${3:-reports}"

mkdir -p "$OUTDIR"

# instalar si faltan
npm ls newman >/dev/null 2>&1 || npm i -D newman
npm ls newman-reporter-htmlextra >/dev/null 2>&1 || npm i -D newman-reporter-htmlextra

REPORT_HTML="$OUTDIR/Ecommerce-api-report.html"
REPORT_JSON="$OUTDIR/Ecommerce-api-report.json"

npx newman run "$COLLECTION" -e "$ENVFILE" \
  -r cli,htmlextra,json \
  --reporter-htmlextra-export "$REPORT_HTML" \
  --reporter-htmlextra-title "Ecommerce API Test Report" \
  --reporter-json-export "$REPORT_JSON" \
  --delay-request 200

# Generar Compliance
node scripts/generateCompliance.js "$REPORT_JSON"
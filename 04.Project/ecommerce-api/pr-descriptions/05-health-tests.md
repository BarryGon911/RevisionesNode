
# PR: Health & E2E mínimo
**Fecha:** 2025-08-18

## Resumen
Endpoint `/health` y prueba e2e que valida 200.

## Cambios
- `src/health/*`, `test/app.e2e-spec.ts`

## Plan de pruebas
- `GET /health` → 200, body `{{ ok: true, ts }}`
- `npm run test:e2e` pasa

### DoD
- E2E básico estable

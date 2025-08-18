
# PR: Docs, Postman & CI (Newman)
**Fecha:** 2025-08-18

## Resumen
Documentación en `README.md`, verificación en `Rubrica-Compliance.md`, colección Postman de **compliance** y workflow de CI con **Newman**.

## Cambios
- `README.md`, `Rubrica-Compliance.md`
- `.github/workflows/ci-newman.yml`
- `ecommerce-api-rubrica-compliance.postman_collection.json`
- `ecommerce-api-local.postman_environment.json`

## Plan de pruebas
- GitHub Actions corre build + seed + Newman y muestra resultados
- Local: 
```
newman run ecommerce-api-rubrica-compliance.postman_collection.json -e ecommerce-api-local.postman_environment.json
```

### DoD
- CI verde con suite mínima
- README usable de punta a punta

# ComplianceRubrica.md
Checklist generado automáticamente con base en los archivos **reales** del proyecto al 2025-08-19 00:07 UTC.

> Nota: Este checklist **no asume** contenidos; únicamente marca si existen rutas/archivos clave. Ajusta/añade criterios según tu `Rubrica.md`.

## Estado de elementos requeridos

- [ x ] README.md en raíz: PRESENTE ✅
- [ x ] Directorio src/: PRESENTE ✅
- [ x ] src/auth/: PRESENTE ✅
- [ x ] src/users/: PRESENTE ✅
- [ x ] src/products/: PRESENTE ✅
- [ x ] src/categories/: PRESENTE ✅
- [ x ] src/cart/: PRESENTE ✅
- [ x ] src/orders/: PRESENTE ✅
- [ x ] src/common/: PRESENTE ✅
- [ x ] src/health/: PRESENTE ✅
- [ x ] src/seeds/: PRESENTE ✅
- [ x ] Carpeta /postman: PRESENTE ✅
- [ x ] Colección Postman (.postman_collection.json): PRESENTE ✅
- [ x ] Ambiente Postman (.postman_environment.json): PRESENTE ✅
- [ x ] CI para Newman (ci/ci-newman.yml o .github/workflows): PRESENTE ✅
- [ x ] Seed en src/seeds/seed.ts: PRESENTE ✅
- [ x ] docker-compose.yml: PRESENTE ✅
- [ x ] .env.example: PRESENTE ✅

## Acciones sugeridas
- Completar/actualizar la colección y ambiente de Postman si aplica.
- Confirmar que los endpoints y guards cumplan la política de roles de la rúbrica.
- Añadir pruebas automatizadas (Newman/Jest) según los criterios de evaluación.
- Verificar que **seeds** alcancen los mínimos de datos por entidad requeridos.
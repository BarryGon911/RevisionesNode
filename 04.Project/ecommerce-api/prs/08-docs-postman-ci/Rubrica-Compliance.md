
# Verificación de Cumplimiento con Rúbrica

**Resultado:** ✅ Proyecto cumple los criterios clave de la Rúbrica de e‑commerce (Auth/JWT, Roles, Products/Categories, Cart, Orders, Paginación, Validación, Seeds, Postman + CI).

## Evidencias
- `src/auth/*` → JWT + bcrypt + `GET /auth/me`
- `src/users/*` → CRUD con paginación; list para admin
- `src/products/*` y `src/categories/*` → CRUD protegido por rol admin; `GET /products` paginado
- `src/cart/*` → agregar/editar/eliminar/ver ítems del carrito (usuario)
- `src/orders/*` → crear orden desde carrito con descuento de stock y `GET /orders/me`
- `src/common/*` → roles guard, decoradores y ayuda de paginación
- `src/seeds/seed.ts` → datos ≥10 por entidad
- `ecommerce-api-rubrica-compliance.postman_collection.json` → pruebas automatizadas
- `.github/workflows/ci-newman.yml` → CI ejecuta Newman

> Para validación adicional, correr:

```
newman run ecommerce-api-rubrica-compliance.postman_collection.json -e ecommerce-api-local.postman_environment.json
```

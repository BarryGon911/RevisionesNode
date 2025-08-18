
# PR: Categories & Products — CRUD + Paginación
**Fecha:** 2025-08-18

## Resumen
Agrega entidades **Category** y **Product** con CRUD (admin) y listados públicos paginados.

## Alcance
**Incluye:** esquemas Mongoose, DTOs validados, `GET /products` paginado, `GET /products/:id`, protección admin para mutaciones.  
**No incluye:** filtros avanzados, búsqueda textual.

## Cambios
- `src/categories/*`, `src/products/*`, `app.module.ts`

## Plan de pruebas
- Crear categoría (admin) → crea y devuelve `_id`.
- Crear producto (admin) con `categoryId`.
- `GET /products?page=1&pageSize=5` devuelve `{{ items,total,page,pageSize }}`.
- **Postman**: carpeta **Categories** + **Products**.

### DoD
- CRUD admin funcional
- Listado con paginación
- Validaciones activas

## Riesgos
- Integridad `categoryId` → validada con `IsMongoId`

## Rollback
Revertir módulo; sin migraciones destructivas.

## Referencias
- `README.md` “Products/Categories”

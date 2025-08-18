
# PR: Cart — add/update/remove/view
**Fecha:** 2025-08-18

## Resumen
Carrito por usuario autenticado con ítems (producto + cantidad).

## Alcance
- `GET /cart` (propiedad del usuario)
- `POST /cart/items`, `PATCH /cart/items/:id`, `DELETE /cart/items/:id`

## Cambios
- `src/cart/*`

## Plan de pruebas
1. Login de cliente → `{{jwt}}`
2. Agregar producto existente al carrito (qty=2)
3. Actualizar qty=3
4. Eliminar ítem
5. **Postman**: carpeta **Cart**

### DoD
- Operaciones idempotentes y validaciones qty ≥1
- Carrito aislado por usuario

## Riesgos
- Concurrencia mínima (colección embebida)

## Rollback
Revertir módulo cart.

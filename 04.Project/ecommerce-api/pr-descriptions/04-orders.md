
# PR: Orders — crear desde carrito y /orders/me
**Fecha:** 2025-08-18

## Resumen
Genera órdenes a partir del carrito, descuenta stock y lista órdenes del usuario.

## Alcance
- `POST /orders` (desde carrito) con `shippingAddress?`
- `GET /orders/me`

## Cambios
- `src/orders/*` y uso de `cart` + `products`

## Plan de pruebas
1. Cliente con carrito poblado → `POST /orders` = 201
2. Verifica descuento de `stock` en productos
3. `GET /orders/me` devuelve historial
4. **Postman**: carpeta **Orders**

### DoD
- Total calculado y stock decrementado
- Carrito se vacía tras ordenar

## Riesgos
- Stock insuficiente → 400 con mensaje claro

## Rollback
Revertir módulo orders.

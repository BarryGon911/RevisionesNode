# API E-commerce (extensión) — Bienes Raíces MVC

Este proyecto extiende la app existente **sin alterar** su funcionalidad actual, agregando una **API REST de e‑commerce** para cumplir la Rúbrica.

## Arranque
```bash
npm install
npm run start
```

## Variables de entorno
```
BD_NOMBRE=...
BD_USER=...
BD_PASS=...
BD_HOST=localhost
JWT_SECRET=una_clave_segura
```

## Seed de datos
```bash
npm run db:importar    # crea/actualiza tablas y carga: usuarios (>=10), ecom_categorias (10), productos (10)
```

## Endpoints (base `/api`)
- **Auth**
  - `POST /api/auth/register` → `{ token, user }`
  - `POST /api/auth/login` → `{ token, user }`

- **Productos**
  - `GET /api/productos?page=1&limit=10` (público, **paginado**)
  - `POST /api/productos` (admin)
  - `PUT /api/productos/:id` (admin)
  - `DELETE /api/productos/:id` (admin)

- **Categorías**
  - `GET /api/categorias` (público)

- **Usuarios (admin) — paginado**
  - `GET /api/usuarios?page=1&limit=10`
  - `GET /api/usuarios/:id`
  - `PUT /api/usuarios/:id`
  - `DELETE /api/usuarios/:id`

- **Carrito (usuario autenticado)**
  - `GET /api/carrito`
  - `POST /api/carrito/items` `{ productoId, cantidad }`
  - `PUT /api/carrito/items/:itemId` `{ cantidad }`
  - `DELETE /api/carrito/items/:itemId`

- **Órdenes**
  - `POST /api/ordenes` (crea orden desde carrito)
  - `GET /api/ordenes/mias`

## Autenticación
Usa **Bearer Token**: `Authorization: Bearer <token>`

## Documentación y pruebas
Se incluye colección Postman en `postman/ecommerce_api_collection.json`.
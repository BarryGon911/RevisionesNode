# E-commerce API — Express.js + MongoDB

API REST para e-commerce con autenticación JWT, roles, validaciones y paginación. Cumple con la rúbrica solicitada.

## Requisitos
- Node 18+
- MongoDB (local o Atlas)
- `.env` configurado

## Variables de entorno
Crea un archivo `.env` basado en `.env.example`:

```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/ecommerce_express_api
JWT_SECRET=cambia_este_secreto_super_seguro
```

## Instalación y ejecución
```bash
npm install
npm run seed   # Carga datos iniciales (>= 10 por entidad principal)
npm run dev    # Levanta el servidor en http://localhost:4000
```

## Endpoints principales
- **Auth**: `/api/auth/register`, `/api/auth/login`
- **Productos** (público GET; admin para POST/PUT/DELETE): `/api/products`
- **Categorías** (público GET; admin para POST/PUT/DELETE): `/api/categories`
- **Usuarios** (admin): `/api/users`
- **Carrito** (usuario): `/api/cart`
- **Órdenes** (usuario): `/api/orders`
- **Docs**: `/api/docs`

## Paginación
`?page=1&limit=10` (por defecto); respuesta incluye `total`, `page`, `pages` y `data`.

## Roles
- `admin`: gestiona productos, categorías y usuarios.
- `customer`: compra productos, gestiona su carrito y órdenes.

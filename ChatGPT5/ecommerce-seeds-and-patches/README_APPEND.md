## Endpoints clave — resumen verificable

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Products
- `GET /api/products` (paginado con `?page=&limit=`)
- `GET /api/products/:id`
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)

### Categories
- `GET /api/categories`
- `GET /api/categories/:id`
- `POST /api/categories` (admin)
- `PUT /api/categories/:id` (admin)
- `DELETE /api/categories/:id` (admin)

### Cart (autenticado)
- `GET  /api/cart`  → carrito del usuario autenticado
- `POST /api/cart/add-product`  { productId, quantity? }
- `PUT  /api/cart/item`          { productId, quantity }
- `DELETE /api/cart/item/:productId`

### Orders (autenticado)
- `POST /api/orders`         → crea orden desde el carrito actual
- `GET  /api/orders`
- `GET  /api/orders/:id`

### Users (admin)
- `GET    /api/users`         (paginado)
- `GET    /api/users/:id`
- `DELETE /api/users/:id`

### Variables de entorno mínimas
- `MONGODB_URI` — puede incluir ya el nombre de la DB (Atlas: `.../ecommerce-db`)
- `MONGODB_DB`  — si usas `mongodb://localhost:27017` (se concatena); default: `ecommerce-db`
- `JWT_SECRET`
- `PORT` (opcional, default 3000)

## Scripts DB (seeds, conteos, inspección)

```bash
# Seed completo (idempotente)
npm run db:seed:all

# Limpiar colecciones y reseed
npm run db:seed:clean

# Semillas por recurso
npm run db:seed:users
npm run db:seed:categories
npm run db:seed:products
npm run db:seed:carts
npm run db:seed:orders

# Conteos rápidos por colección
npm run db:counts

# Listar productos (JSON) con paginación
npm run db:products -- --page=1 --limit=20

# Ver carrito por email o userId (JSON)
npm run db:cart -- --email=admin@example.com
# o
npm run db:cart -- --userId=64f...abc

# Ver órdenes (todas o por usuario)
npm run db:orders
npm run db:orders -- --email=user1@example.com

# ⚠️ Reset DB de desarrollo (drop)
npm run db:reset       # (protegido; corre con --force)
```

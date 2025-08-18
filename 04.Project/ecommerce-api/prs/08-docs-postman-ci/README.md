
# ecommerce-api — NestJS + MongoDB (Compliant con Rúbrica)

API de e‑commerce con **Auth/JWT**, **Roles (admin/customer)**, **Products/Categories**, **Cart**, **Orders**, **paginación**, validación y seeds.

## Requisitos
- Node 20+, npm
- MongoDB (o `docker-compose up -d` para levantarlo)

## Configuración
```bash
cp .env.example .env
# Ajusta variables si es necesario
npm i
npm run seed   # Inserta admin, usuarios y datos (≥10 por entidad)
npm run start:dev
```

## Endpoints principales

### Auth
- POST `/auth/register` → { access_token }
- POST `/auth/login` → { access_token }
- GET `/auth/me` (Bearer) → datos del token

### Categories
- GET `/categories`
- POST `/categories` (admin)

### Products
- GET `/products?page=1&pageSize=10`
- GET `/products/:id`
- POST `/products` (admin)
- PATCH `/products/:id` (admin)
- DELETE `/products/:id` (admin)

### Cart (Bearer)
- GET `/cart`
- POST `/cart/items` { productId, quantity }
- PATCH `/cart/items/:id` { quantity }
- DELETE `/cart/items/:id`

### Orders (Bearer)
- POST `/orders` { shippingAddress? }  → crea desde carrito, descuenta stock
- GET `/orders/me`

## Paginación
Formato: `{ items, total, page, pageSize }`

## Postman & CI
Importa los archivos de la carpeta raíz (ver sección de descargas en ChatGPT) y ejecuta:
```bash
newman run ecommerce-api-rubrica-template.postman_collection.json -e ecommerce-api-local.postman_environment.json
```

## Cumplimiento de Rúbrica
- ✅ Auth con JWT + bcrypt
- ✅ Roles admin/customer (guard)
- ✅ CRUD Products/Categories con protección de admin
- ✅ Cart con add/update/remove y vista del carrito
- ✅ Orders desde carrito, descuenta stock
- ✅ Paginación en listados clave
- ✅ Validación (`class-validator`) y pipes globales
- ✅ Seeds con ≥10 por entidad
- ✅ Colección Postman y workflow de CI con Newman

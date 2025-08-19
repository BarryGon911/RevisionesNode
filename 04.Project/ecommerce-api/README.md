# ecommerce-api — NestJS + MongoDB

API de e-commerce con **Auth/JWT**, **Roles (admin/customer)**, **Products**, **Categories**, **Cart**, **Orders**, **paginación**, validación y **seeds** idempotentes.

> Proyecto pensado para cumplir la **Rubrica.md** incluida en el repo: autenticación segura, autorización por roles, CRUD protegidos, datos de ejemplo (≥10 por entidad), colección de Postman y CI (Newman).

---

## 🧱 Stack
- **NestJS** + **TypeScript**
- **MongoDB** con **Mongoose**
- **JWT** (estrategia Bearer) + **bcrypt**
- **class-validator / class-transformer**
- Postman + **Newman** (colecciones en `/postman`)
- GitHub Actions (workflow de ejemplo en `/ci/ci-newman.yml`)

---

## 📂 Estructura (resumen)

```
src/
  auth/           # /auth/register, /auth/login, /auth/me
  users/          # CRUD usuarios, esquema User
  products/       # CRUD productos, esquema Product
  categories/     # CRUD categorías, esquema Category
  cart/           # /cart + items (add/update/remove/view)
  orders/         # /orders (crear desde carrito) y /orders/me
  common/         # RolesGuard, Roles decorator, GetUser, paginación
  seeds/          # seed.ts (este archivo)
  health/         # /health
  app.module.ts
  main.ts
```

---

## ⚙️ Configuración y ejecución

1) **Variables de entorno**
```bash
cp .env.example .env
# Edita si es necesario:
# MONGODB_URI=mongodb://localhost:27017/ecommerce_api
# JWT_SECRET=supersecretjwt
# ADMIN_EMAIL=admin@mail.com
# ADMIN_PASSWORD=AdminPassw0rd!
```

2) **Instalación y levantar MongoDB (opcional con Docker)**
```bash
npm i
# Si quieres usar Docker:
docker-compose up -d
```

3) **Semillas (≥10 por entidad)**
```bash
npm run seed
```
- Crea **1 admin + 9 customers** (total 10 usuarios).
- Crea **10 categorías** y **20 productos**.
- Es **idempotente** (usa *upserts*): puedes ejecutarlo varias veces.

4) **Correr en desarrollo**
```bash
npm run start:dev
```

---

## 🔐 Autenticación

- **POST** `/auth/register` – Crea usuario (customer).
- **POST** `/auth/login` – Devuelve `{ access_token }`.
- **GET** `/auth/me` – Requiere `Authorization: Bearer <token>`.

> El admin inicial se toma de `ADMIN_EMAIL` y `ADMIN_PASSWORD`.

---

## 📦 Endpoints (resumen)

### Products `/products`
- **GET** `/products` – Lista paginada: `?page=1&pageSize=10`
- **GET** `/products/:id`
- **POST** `/products` *(admin)*
- **PATCH** `/products/:id` *(admin)*
- **DELETE** `/products/:id` *(admin)*

### Categories `/categories`
- **GET** `/categories`
- **POST** `/categories` *(admin)*

### Cart `/cart`
- **GET** `/cart` – Ver carrito del usuario autenticado
- **POST** `/cart/items` – Añadir ítem `{ product, quantity }`
- **PATCH** `/cart/items/:id` – Actualizar cantidad
- **DELETE** `/cart/items/:id` – Quitar ítem

### Orders `/orders`
- **POST** `/orders` – Crea pedido desde el carrito
- **GET** `/orders/me` – Mis pedidos

### Users `/users`
- **GET** `/users` – *(admin)* listado paginado
- **POST** `/users` – Crear usuario
- **PATCH** `/users/:id` – Requiere JWT (propietario o admin, según tu política)
- **DELETE** `/users/:id` – *(admin)*

---

## 📑 Postman / Newman

Colecciones y ambientes en `/postman`:
- `ecommerce-api-current.postman_collection.json`
- `ecommerce-api-rubrica-template.postman_collection.json`
- `ecommerce-api-local.postman_environment.json`

**Ejecutar Newman (local):**
```bash
npx newman run postman/ecommerce-api-current.postman_collection.json   -e postman/ecommerce-api-local.postman_environment.json   --timeout-request 10000
```

> El workflow de GitHub Actions (`/ci/ci-newman.yml`) ejemplifica cómo correr Newman en CI.

---

## 🧪 Paginación y Validación

- Paginación por query params: `page` (1..n), `pageSize` (10 por defecto).
- DTOs con `class-validator` (e.g., `@IsEmail`, `@MinLength`).
- Pipes globales definidas en `main.ts` (validación y transformación).

---

## 🛠️ Scripts útiles

```jsonc
{
  "seed": "ts-node -r tsconfig-paths/register src/seeds/seed.ts",
  "start:dev": "nest start --watch",
  "build": "nest build",
  "start": "node dist/main.js",
  "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
  "test": "jest"
}
```

---

## ✅ Checklist de cumplimiento (extracto)

- [x] **Auth** con JWT y hash de contraseñas (`bcrypt`).
- [x] **Roles** `admin/customer` con guard.
- [x] **CRUD** de Products/Categories protegido para `admin`.
- [x] **Cart** (add/update/remove/view).
- [x] **Orders** desde carrito (descuenta stock).
- [x] **Paginación** en listados.
- [x] **Validación** de DTOs.
- [x] **Seeds** con ≥10 por entidad (1 admin + 9 usuarios, 10 categorías, 20 productos).
- [x] **Postman** + **Newman** y CI de ejemplo.

---

## 📄 Licencia
MIT

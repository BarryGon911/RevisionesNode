# 🛒 Ecommerce API — Whole Project README

> Documentación integral del proyecto. Generado automáticamente el **2025-08-25 20:33:35**.

## ✨ Descripción
API de comercio electrónico basada en **Express.js** y **MongoDB (Mongoose)** con autenticación **JWT**, validaciones con **express-validator**, paginación y documentación **OpenAPI/Swagger**.

## 🧱 Stack
- Node.js (ESM) • Express 5
- MongoDB • Mongoose
- JWT (jsonwebtoken)
- Validaciones: express-validator
- CORS, morgan
- Swagger UI (OpenAPI)
- Postman Collections (tests)

## 📁 Estructura (parcial)
```
./
  .env
  .env.template
  .gitignore
  README.md
  Rubrica.md
  package-lock.json
  package.json
  docs/
    openapi.yaml
  postman/
    Category.postman_collection.json
    Ecommerce.postman_collection.json
    Products.postman_collection.json
    development.postman_environment.json
  src/
    app.js
    server.js
    src/config/
      db.js
    src/controllers/
      authController.js
      cartsController.js
      categoriesController.js
      ordersController.js
      productsController.js
      usersController.js
    src/docs/
      openapi.yaml
    src/middlewares/
      auth.js
      validate.js
    src/models/
      Cart.js
      Category.js
      Order.js
      Product.js
      User.js
    src/routes/
      authRoutes.js
      cartRoutes.js
      categoryRoutes.js
      index.js
      orderRoutes.js
      productRoutes.js
      userRoutes.js
    src/seeders/
      seed.js
    src/utils/
      pagination.js
```

## ⚙️ Variables de entorno (.env)
> Usa **comillas dobles** cuando incluya caracteres especiales.

```dotenv
PORT="3000"
MONGODB_URI="mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority"
JWT_SECRET="cambia-esto-por-un-secreto-seguro"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="password123"
```

## ▶️ Scripts de NPM
```json
{
  "dev": "node --env-file=.env src/server.js",
  "start": "node src/server.js",
  "seed": "node --env-file=.env src/seeders/seed.js",
  "lint": "echo \"(Tip) Add ESLint if needed\""
}
```

Sugeridos (si no existen aún):
```json
{
  "seed:admin": "node --env-file=.env src/seeders/ensureAdmin.js",
  "test:api:report": "node postman/run-tests-and-log.js --open"
}
```

## 🚀 Inicio rápido
```bash
# 1) Instalar
npm install

# 2) Ejecutar en dev (toma PORT del .env)
npm run dev

# 3) Sembrar datos de ejemplo
npm run seed

# (Opcional) Crear/promover admin desde .env
npm run seed:admin
```

## 🔐 Autenticación y Roles
- Registro `/api/auth/register` → 201 (devuelve `user` y `token`)
- Login `/api/auth/login` → 200 (devuelve `user` y `token`)
- Middleware `auth(["admin", "customer"])` protege rutas por rol.

## 🧭 Endpoints principales
- **Auth:** `/auth/register`, `/auth/login`
- **Productos:** `GET /products`, `GET /products/:id`, `POST/PUT/DELETE /products` *(requiere admin)*
- **Categorías:** `GET /categories`, `POST/PUT/DELETE /categories` *(admin)*
- **Carrito:** `GET /cart`, `POST /cart` *(add)*, `PUT /cart` *(update cantidad)*, `DELETE /cart/:productId` *(remove)*, `DELETE /cart/clear`
- **Órdenes:** `POST /orders`, `GET /orders`
- **Usuarios (admin):** `GET /users?page&limit` (paginado)

> Paginación: helper `buildPaginatedResult` devuelve `{ total, page, pages, data }`.

## 📄 Documentación OpenAPI
- Archivo: `docs/openapi.yaml`
- Swagger UI: `http://localhost:3000/api/docs`  
- Actualmente `servers` en openapi.yaml es [{"url": "http://localhost:4000/api"}]
- Recomendación: usar
```yaml
servers:
  - url: /api
```

## 🧪 Pruebas con Postman
- Colecciones incluidas: `postman/Ecommerce.postman_collection.json`, `postman/Products.postman_collection.json`, `postman/Category.postman_collection.json`
- Sugerido: **runner** `postman/Ecommerce.baseUrl.fullrunner.max.postman_collection.json` con variable `{baseUrl}` → `http://localhost:3000/api`
- Reportes:
  - HTML: `reports/Ecommerce-api-report.html`
  - MD: `reports/Compliance-Postman.md`
  - Dashboard local (si lo tienes instalado): `http://localhost:3000/api/test-reports/ui/`

## 🛠️ Troubleshooting
- **400 Login (admin):** verifica `ADMIN_EMAIL`/`ADMIN_PASSWORD` y que tu seed de admin coincida.
- **401/403 en endpoints admin:** asegúrate de pasar `Authorization: Bearer <token_admin>`.
- **500 al crear orden:** corrobora que existan items en el carrito y que los productos tengan `price` válido.
- **OpenAPI puerto fijo:** cambia `servers` por `- url: /api` para entorno agnóstico.

## 📚 Créditos/Notas
Proyecto académico con fines de evaluación. Estructura por capas: models, controllers, routes, middlewares, seeders y utils.

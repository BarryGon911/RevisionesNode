# E-commerce API — Express.js + MongoDB

API REST para e-commerce con autenticación JWT, roles, validaciones y paginación. Cumple con la rúbrica solicitada
(funcionalidad de endpoints, relaciones, seguridad, paginación, organización por capas, demo con Postman, bcrypt, roles y documentación).

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
- **Carrito** (usuario): `/api/cart` (agregar/actualizar/eliminar items)
- **Órdenes** (usuario): `/api/orders` (crear desde carrito o directamente; listar propias)

Consulta la documentación OpenAPI en: **`/api/docs`**.

## Paginación
Parámetros `page` y `limit` (por defecto `page=1&limit=10`). Devuelve `total`, `page`, `pages` y `data`.

## Roles
- `admin`: gestiona productos, categorías y usuarios.
- `customer`: compra productos, gestiona su carrito y órdenes.

## Pruebas Postman
Se incluye **`postman/Ecommerce.postman_collection.json`** con ejemplos listos para probar.

## Organización de carpetas
```
docs/
postman/
src/
  config/
  controllers/
  middlewares/
  models/
  routes/
  seeders/
  utils/
  app.js
  server.js
.env
.env.template
.gitignore
package-lock.json
package.json
README.md
Rubrica.md
```

## Notas
- Contraseñas con `bcrypt`.
- Rutas protegidas con `JWT` y middleware de roles.
- Validaciones con `express-validator`.
- Manejo de errores consistente (400–500).

# ✅ Proyecto Integrador: API E-commerce con Express.js

API REST para e-commerce con autenticación JWT, roles, validaciones y paginación.
Cumple con la rúbrica solicitada (funcionalidad de endpoints, relaciones, seguridad, paginación, organización por capas, demo con Postman, bcrypt, roles y documentación).

## Requisitos
- Node v22.18.0
- MongoDB (local o Atlas)
- Varaibles de entorno configuradas

## Variables de Entorno
Se crea un archivo **`.env`** basado en **`.env.example`**:

```
MONGODB_URI=mongodb://localhost:27017/ecommerce_express_api
JWT_SECRET=cambia_este_secreto_super_seguro
PORT=3000
```

## Instalación y Ejecución
```bash
npm install
npm run seed   # Carga datos iniciales (>= 10 por entidad principal)
npm run dev    # Levanta el servidor en http://localhost:3000
```

## Endpoints Principales
- **Auth**: **`/api/auth/register`**, **`/api/auth/login`**
- **Productos** (Público GET; admin para POST/PUT/DELETE): **`/api/products`**
- **Categorías** (Público GET; admin para POST/PUT/DELETE): **`/api/categories`**
- **Usuarios** (Admin): **`/api/users`**
- **Carrito** (Usuario): **`/api/cart`**
- **Órdenes** (Usuario): **`/api/orders`**
- **Consulta la documentación OpenAPI en:** **`/api/docs`**

## Paginación
Parámetros `page` y `limit` (por defecto `page=1&limit=10`). Devuelve `total`, `page`, `pages` y `data`.

## Roles
- `admin`: gestiona productos, categorías y usuarios.
- `customer`: compra productos, gestiona su carrito y órdenes.

## Pruebas en Postman
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
- Contraseñas con **`bcrypt`**.
- Rutas protegidas con **`JWT`** y **middleware de roles**.
- Validaciones con **`express-validator`**.
- Manejo de errores consistente **(400–500)**.

# Proyecto Integrador – API E-commerce (Express.js)

> **Este README responde punto por punto lo solicitado en la Rúbrica de Revisión** y documenta cómo probar cada criterio.

---

## 1) Presentación breve del proyecto (máx 5 minutos)

### ¿Qué hace tu API?
- E-commerce básico con:
  - **Autenticación** (registro/login con **JWT**).
  - **Productos** y **Categorías** (CRUD).
  - **Carrito de compras** (agregar, actualizar, eliminar ítems).
  - **Órdenes** (crear desde el carrito y consultar las propias).
  - **Usuarios** (listado/consulta/eliminación solo por **admin**).

### ¿Cómo está estructurada?
```
ecommerce-api/
  server.js
  .env               # variables de entorno (local)
  dotenv.template    # plantilla de variables
  package.json
  seeds/             # datos de ejemplo (10+ por entidad principal)
    seed.js
  src/
    config/
      database.js
    controllers/     # lógica por recurso
    middlewares/     # auth JWT, roles, validación, logger, errores
    models/          # User, Product, Category, Cart, Order
    routes/          # /auth, /products, /categories, /cart, /orders, /users
      index.js       # monta subrutas bajo /api
postman/
  development.postman_environment.json
  Auth.postman_collection.json
  Categories.postman_collection.json
  Products.postman_collection.json
  Cart.postman_collection.json
  Orders.postman_collection.json
  Users.postman_collection.json
```

### ¿Qué endpoints clave implementaste?
- **Auth**: `POST /api/auth/register`, `POST /api/auth/login`
- **Products**: 
  - Público: `GET /api/products` (con **paginación**), `GET /api/products/:id`
  - Admin: `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id`
- **Categories**:
  - Público: `GET /api/categories`, `GET /api/categories/:id`
  - Admin: `POST /api/categories`, `PUT /api/categories/:id`, `DELETE /api/categories/:id`
- **Cart (protegido)**:
  - `GET /api/cart`, `POST /api/cart/add-product`, `PUT /api/cart/item`, `DELETE /api/cart/item/:productId`
- **Orders (protegido)**:
  - `POST /api/orders`, `GET /api/orders`, `GET /api/orders/:id`
- **Users (admin)**:
  - `GET /api/users` (**paginado**), `GET /api/users/:id`, `DELETE /api/users/:id`

---

## 2) Verificación de requisitos previos

- **Base de datos conectada y funcional** → `src/config/database.js`
- **10+ registros por entidad principal** → ejecutar **seed** (ver pasos abajo).
- **Servidor Express corriendo** → `npm run dev` o `npm start`.
- **Endpoints listos para Postman** → carpeta `postman/` con colecciones y environment.

### Cómo correr el proyecto (local)
1. **Instalar dependencias**
   ```bash
   npm install
   ```
2. **Configurar variables**
   - Copia `dotenv.template` a `.env` y ajusta valores (por defecto funciona con MongoDB local en `mongodb://localhost:27017/ecommerce-db`).  
3. **Sembrar datos (10+ registros por entidad)**
   ```bash
   npm run seed
   ```
4. **Iniciar servidor**
   ```bash
   npm run dev
   # o
   npm start
   ```
5. **Revisar salud**
   - `GET http://localhost:3000/health` → `{ "status": "ok" }`

---

## 3) Prueba de funcionalidades principales

> Importa en **Postman**: `postman/development.postman_environment.json` y las colecciones de `postman/*.postman_collection.json`.

- **Registro/login:** usar colección **Auth** (obtén `token` e inyecta en el environment).
- **Endpoints públicos:** usar **Products** y **Categories** (GET sin token).
- **Endpoints protegidos (carrito, órdenes):** usa **Cart** y **Orders** (requiere `token`).
- **Relaciones entre modelos:** 
  - `Product.category` → `Category`
  - `Order.user`, `Order.items[].product` → `User`, `Product`

---

## 4) Revisión de código

- **Organización por capas**: `models`, `controllers`, `routes`, `middlewares`, `config`.
- **Validaciones**: `express-validator` en rutas clave (ids, cuerpo, paginación).
- **JWT y protección**: `src/middlewares/authMiddleware.js` + `isAdminMiddleware.js`.
- **Manejo de errores**: 
  - Global (`globalErrorHandler.js`) para *uncaughtException* y *unhandledRejection* (log a `logs/error.log`).
  - De aplicación (`errorHandler.js`) al final del pipeline).
- **Paginación**:
  - **Products** y **Users**: `GET /api/products?limit=&page=` y `GET /api/users?limit=&page=`.

---

## 5) Checklist – Estado de Cumplimiento

| Categoría                       | Criterio                                                                 | Estado |
| ------------------------------- | ------------------------------------------------------------------------ | :----: |
| **Funcionalidad de Endpoints**  | Registro/Login funcional con JWT                                         |  ✅   |
|                                 | Productos: GET público, POST/PUT/DELETE (requiere token)                 |  ✅   |
|                                 | Carrito de compras funcional (agregar, actualizar, eliminar)             |  ✅   |
|                                 | Usuarios: CRUD básico, acceso restringido por token (admin)              |  ✅   |
|                                 | Órdenes: creación, listado por usuario                                   |  ✅   |
| **Relaciones y datos**          | Productos asociados a categorías                                         |  ✅   |
|                                 | Órdenes asociadas a usuarios y productos                                 |  ✅   |
|                                 | Al menos 10 registros por entidad principal (via `npm run seed`)         |  ✅   |
|                                 | Datos consistentes (refs válidas)                                        |  ✅   |
| **Seguridad y validación**      | `express-validator` en rutas clave                                       |  ✅   |
|                                 | Middleware de autenticación con JWT                                      |  ✅   |
|                                 | Manejo correcto de errores (400–500)                                     |  ✅   |
| **Paginación**                  | Listado de usuarios y productos con paginación                           |  ✅   |
| **Organización del código**     | Separación clara por carpetas                                            |  ✅   |
|                                 | Código modular                                                            |  ✅   |
| **Presentación de la demo**     | Explicación clara del flujo + pruebas en vivo con Postman                |  ✅   |
| **Retos requeridos** (prerrequisitos) | R8 Mongo + relaciones, R10 Registro, R11 JWT (en este repo)         |  ✅   |
|                                 | R9 MySQL (se evalúa como reto aparte, no dentro de esta API con Mongo)   |  N/A  |
| **Funcionalidades adicionales** | `bcrypt` para contraseñas                                                |  ✅   |
|                                 | Roles en modelo de usuario (admin/cliente)                               |  ✅   |
|                                 | Documentación básica en `README.md`                                      |  ✅   |

---

## Datos iniciales y accesos (seed)
- **Admin**: `admin@example.com / Admin123!`
- **Usuarios**: `user1@example.com … user9@example.com / Password1!`
- **Categorías**: 10 categorías (`Category 1` … `Category 10`)
- **Productos**: 10 productos relacionados a categorías
- **Órdenes**: 5 órdenes generadas (1 por cada uno de 5 usuarios)

---

## Notas finales
- Variables sensibles en **.env** (usa `dotenv.template` como guía).
- **Colores** en logs: **no aplicados aún** (se pueden agregar a `logger.js`/conexión cuando lo indiques).
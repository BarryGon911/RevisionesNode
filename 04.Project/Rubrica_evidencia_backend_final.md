# Evidencia de Cumplimiento - Proyecto BackEnd Bienes Raíces MVC

Este documento mapea cada criterio aplicable de **Rubrica.md** a la implementación en el código entregado.

---

## 1. Endpoints y Funcionalidad API

| Criterio | Cumple | Evidencia en Código |
|---|---|---|
| Registro/Login con JWT | ✅ | `controllers/api/authApiController.js`, `POST /api/auth/register`, `POST /api/auth/login` |
| Productos: listado público y CRUD admin | ✅ | `controllers/api/productoController.js`, rutas en `routes/apiRoutes.js` |
| Carrito: agregar, actualizar, eliminar | ✅ | `controllers/api/carritoController.js`, rutas `/api/carrito`, `/api/carrito/items` |
| Usuarios: CRUD solo admin | ✅ | `controllers/api/usuarioApiController.js`, rutas `/api/usuarios*` con `requireRole('admin')` |
| Órdenes: crear y listar por usuario | ✅ | `controllers/api/ordenController.js`, `/api/ordenes`, `/api/ordenes/mias` |
| Propiedades (original MVC) | ✅ | `controllers/api/propiedadApiController.js` o ruta `/api/propiedades` |

---

## 2. Relaciones y Datos

| Criterio | Cumple | Evidencia |
|---|---|---|
| Relación Productos ↔ Categorías E-commerce | ✅ | `models/Producto.js`, `models/CategoriaEcom.js`, `models/index.js` |
| Relación Órdenes ↔ Usuarios/Productos | ✅ | `models/Orden.js`, `models/OrdenItem.js` |
| Seeds con ≥10 registros por entidad | ✅ | `seed/usuarios.js` (10+), `seed/ecom_categorias.js` (10), `seed/productos.js` (10) |
| Seeds cargados en seeder.js | ✅ | `seed/seeder.js` (bulkCreate de todas las entidades) |
| Datos consistentes (FK) | ✅ | Asociaciones Sequelize + `db.sync({ alter: true })` |

---

## 3. Seguridad y Validación

| Criterio | Cumple | Evidencia |
|---|---|---|
| Validaciones con express-validator | ✅ | `routes/apiRoutes.js` en rutas de creación/edición |
| Autenticación con JWT | ✅ | `middleware/apiAuth.js`, `helpers/tokens.js` |
| Manejo de errores global | ✅ | `middleware/errorHandler.js` |
| Roles (admin/cliente) | ✅ | `models/Usuario.js` (campo `role`, default `'cliente'`), uso de `requireRole('admin')` |

---

## 4. Paginación

| Criterio | Cumple | Evidencia |
|---|---|---|
| Usuarios con paginación | ✅ | `controllers/api/usuarioApiController.js` (`findAndCountAll`, `page`, `limit`) |
| Productos con paginación | ✅ | `controllers/api/productoController.js` (`findAndCountAll`, `page`, `limit`) |

---

## 5. Organización del Código

| Criterio | Cumple | Evidencia |
|---|---|---|
| Separación en capas MVC | ✅ | Carpetas: `models/`, `controllers/`, `routes/`, `middleware/`, `helpers/` |
| Seeds y configuración DB separados | ✅ | `seed/`, `config/db.js` |
| Documentación técnica | ✅ | `README.md` + Swagger `/docs` (`docs/openapi.json`) |
| Colección Postman | ✅ | `postman/ecommerce_api_collection.json` |

---

## 6. Exclusiones y Observaciones

- **Retos 08, 09, 10 & 11** → **No incluídos en éste documento.**
- **Base de datos** → Implementada con **MySQL** usando **Sequelize como ORM.**
- **FrontEnd mínimo (Pug + TailwindCSS)** → No evaluado como parte de esta entrega, se priorizó funcionalidad del BackEnd.

---

**Conclusión:**  
Este backend cumple con los criterios aplicables de **Rubrica.md** en la parte de MySQL/Sequelize, con las excepciones indicadas.

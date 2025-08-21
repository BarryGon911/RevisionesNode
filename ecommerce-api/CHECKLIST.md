# ✅ Checklist de Entrega – Proyecto Integrador E-commerce API

## 1. Presentación del proyecto
- [x] Explicación breve (qué hace la API, arquitectura, endpoints clave).

## 2. Requisitos previos
- [x] Conexión a BD verificada (`src/config/database.js`).
- [x] +10 registros por entidad principal mediante `npm run seed`.
- [x] Servidor funcionando (`npm run dev` / `npm start`).
- [x] Endpoints listos en Postman (`/postman`).

## 3. Pruebas de funcionalidades principales
- [x] Registro/Login con JWT.
- [x] Endpoints públicos (Products, Categories).
- [x] Endpoints protegidos (Cart, Orders).
- [x] Relaciones entre entidades (Product→Category, Order→User/Product).

## 4. Revisión de código
- [x] Organización por capas (controllers, routes, models, middlewares).
- [x] Validaciones con `express-validator`.
- [x] Middlewares de errores (`errorHandler.js`, `globalErrorHandler.js`).
- [x] Autenticación con JWT.
- [x] Roles y permisos (admin/customer).

## 5. Checklist de revisión de rúbrica
- [x] Registro/Login con validaciones y JWT.
- [x] CRUD de Productos con token en mutaciones.
- [x] CRUD de Categorías.
- [x] Carrito funcional (agregar, actualizar, eliminar).
- [x] Órdenes (crear desde carrito, listar propias, detalle).
- [x] Usuarios (admin: listar paginado, detalle, eliminar).
- [x] Relaciones correctas entre entidades.
- [x] Paginación en Productos y Usuarios.
- [x] Manejo correcto de errores 4xx/5xx.
- [x] Código limpio y organizado.
- [x] Seeds consistentes (10+ por entidad principal).
- [x] Colecciones de Postman incluidas.

## 6. Extras
- [x] Colores en logs: MongoDB (verde), Server (cyan).
- [x] README.md documenta paso a paso toda la rúbrica.

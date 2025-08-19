# Evidencia de Cumplimiento — API E‑commerce (Express + MongoDB)

> Proyecto apegado 100% a la **Rúbrica de Revisión – Proyecto Integrador** (endpoints, validaciones, JWT, bcrypt, paginación, roles, estructura por carpetas).

---

## 1) Presentación breve del proyecto

**¿Qué hace la API?**  
Provee un backend de e‑commerce básico con: registro/login con JWT, catálogo público de productos y categorías, carrito de compras por usuario, creación de órdenes y administración (solo rol `admin`) de usuarios, productos y categorías.

**¿Cómo está estructurada?**  
Separación por capas/carpetas: `models`, `controllers`, `routes`, `middlewares`, `utils` y `config`.  
- **Models**: `User`, `Category`, `Product`, `Cart`, `Order` (relaciones: `Product.category` → `Category`; `Order.user` → `User`; `Order.items.product` → `Product`; `Cart.user` → `User`).
- **Controllers**: lógica de negocio (por recurso).
- **Routes**: definición de endpoints y validaciones con `express-validator`.
- **Middlewares**: autenticación JWT (`requireAuth`), autorización por **roles** (`requireRole`) y manejo de validaciones (`handleValidation`).
- **Utils**: `buildPagination` para **paginación** consistente.
- **Config**: conexión a MongoDB con `dotenv`.

**Endpoints clave implementados (resumen):**
- **Auth**: `POST /api/auth/register`, `POST /api/auth/login` (JWT)
- **Público**: `GET /api/products` (paginado, filtro `q` y `category`), `GET /api/products/:id`, `GET /api/categories`
- **Protegido (cliente)**: `GET /api/users/me`, carrito (`GET /api/cart`, `POST/PUT/DELETE /api/cart/items`), órdenes (`POST /api/orders`, `GET /api/orders/my`)
- **Admin**: `GET /api/users` (paginado), CRUD de productos y categorías, `GET /api/orders` (todas las órdenes)

---

## 2) Verificación de requisitos previos

- **Base de datos conectada y funcional**: archivo `src/config/db.js`, uso de `mongoose` 8.x y variables de entorno (`MONGODB_URI`).
- **Datos de ejemplo**: script `npm run seed` crea **10 usuarios**, **10 categorías** y **10 productos**.
- **Servidor Express**: `src/server.js` inicia la app en `PORT` (por defecto 3000).
- **Endpoints listos para Postman**: ver README con rutas; todas responden JSON y manejan errores 4xx/5xx.

---

## 3) Prueba de funcionalidades principales

### a) Registro / Login (JWT)
- **Registro**: `POST /api/auth/register` body `{ name, email, password, role? }`.  
  Valida tipos y tamaños; contraseñas se guardan con `bcrypt` (10 salt rounds).  
  Respuesta: usuario sin `passwordHash`.
- **Login**: `POST /api/auth/login` body `{ email, password }` → **JWT** (expira en 12h).  
  Token en `Authorization: Bearer <token>`.

### b) Endpoints públicos
- **Productos**: `GET /api/products?page=1&limit=10&category=<id>&q=texto` (paginado).  
- **Categorías**: `GET /api/categories`.

### c) Endpoints protegidos
- **Carrito**: `GET /api/cart`, `POST /api/cart/items`, `PUT /api/cart/items/:productId`, `DELETE /api/cart/items/:productId`.
- **Órdenes**: 
  - `POST /api/orders` crea una orden **desde items explícitos** o **desde el carrito** si `items` no viene.  
  - `GET /api/orders/my` lista órdenes del usuario autenticado.

### d) Relaciones entre modelos
- `Product.category` referencia `Category` (populate).
- `Order.user` y `Order.items.product` referencian `User` y `Product` (populate).
- `Cart.user` único por usuario; `Cart.items.product` referencia `Product`.

---

## 4) Revisión de código

- **Organización por capas**: carpetas `models`, `controllers`, `routes`, `middlewares`, `utils`, `config`.
- **Validaciones y middlewares**: `express-validator` aplicado a rutas clave (auth, products, categories, users, cart, orders) + `handleValidation` centralizado.
- **JWT y protección de rutas**: `requireAuth` verifica token; `requireRole('admin')` protege rutas de administración.
- **Errores 400–500**: validaciones devuelven 400; recursos inexistentes 404; catch-all 500.

---

## 5) Checklist de Revisión (cumplimiento)

| Categoría | Criterio | Cumple |
|---|---|---|
| **Funcionalidad de Endpoints** | Registro/Login funcional con JWT | ✅ |
|  | Productos: GET público, POST/PUT/DELETE (requiere token admin) | ✅ |
|  | Carrito de compras (agregar, actualizar, eliminar) | ✅ |
|  | Usuarios: CRUD básico, acceso restringido por token/rol | ✅ (admin) |
|  | Órdenes: creación y listado por usuario | ✅ |
| **Relaciones y datos** | Productos asociados a categorías | ✅ |
|  | Órdenes asociadas a usuarios y productos | ✅ |
|  | Al menos 10 registros por entidad principal | ✅ (seed) |
|  | Datos consistentes (FK válidas, sin campos vacíos) | ✅ |
| **Seguridad y validación** | `express-validator` en rutas clave | ✅ |
|  | Middleware de autenticación con JWT | ✅ |
|  | Manejo correcto de errores (400–500) | ✅ |
| **Paginación** | Listado de usuarios y productos con paginación | ✅ |
| **Organización del código** | Carpetas `models`, `controllers`, `routes`, `middlewares` | ✅ |
|  | Código modular, helpers/`utils` | ✅ |
| **Presentación de la demo** | Explicación del flujo | ✅ |
|  | Pruebas con Postman (rutas listas y documentadas en README) | ✅ |
| **Funcionalidades adicionales** | `bcrypt` para contraseñas | ✅ |
|  | Roles en usuario (admin/cliente) | ✅ |
|  | Documentación básica en `README.md` | ✅ |

---

## Uso rápido con cURL (ejemplo mínimo)

```bash
# Login admin (tras seed)
curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Password123!"}'
# export TOKEN="..."
```

> **Nota**: todos los endpoints administrativos requieren `Authorization: Bearer $TOKEN` con rol `admin`.

---

### Anexo — Documentación con Swagger (opcional de la rúbrica)
- Ruta: **GET `/docs`** (UI de Swagger) y **GET `/openapi.json`** (spec).
- La especificación incluye **auth JWT**, **paginación**, **roles** y todos los endpoints implementados.

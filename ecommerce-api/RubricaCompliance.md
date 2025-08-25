# ✅ RubricaCmpliance.md — Cumplimiento de Rúbrica

Este documento resume el grado de cumplimiento del proyecto frente a la rúbrica de evaluación y enumera hallazgos/fallas observadas durante la ejecución de pruebas.

## 📦 Contexto
- Nombre del paquete: **ecommerce-express-api**
- OpenAPI: **sí** — servers actuales: [{"url": "http://localhost:4000/api"}]
- Rúbrica en repo: **sí**

## 📋 Checklist (resumen)
| Categoría | Criterio | Estado |
|---|---|---|
| Funcionalidad | Registro/Login con JWT | ✅ Implementado (`/auth/register`, `/auth/login`) |
| Funcionalidad | Productos público/privado | ✅ GET público / ✅ admin para mutaciones |
| Funcionalidad | Carrito (agregar/actualizar/eliminar) | ✅ Implementado (`/cart`) |
| Funcionalidad | Usuarios (acceso admin) | ✅ GET /users con paginación |
| Funcionalidad | Órdenes (crear/listar) | ✅ Implementado (`/orders`) |
| Relaciones/Datos | Productos ↔ Categorías | ✅ Asociado por `category` en Product |
| Relaciones/Datos | Órdenes ↔ Usuarios/Productos | ✅ Items con `{ product, quantity, price }` |
| Relaciones/Datos | ≥10 registros por entidad | ✅ Seed incluye ≥10 categorías/usuarios y ≥12 productos |
| Seguridad | Validación con express-validator | ✅ En rutas clave (products, categories, cart) |
| Seguridad | JWT + roles | ✅ `auth(["admin","customer"])` |
| Errores | Manejo 400–500 | ✅ Presente en controladores |
| Paginación | Usuarios y productos | ✅ Helper `buildPaginatedResult` |
| Organización | Capas (models/controllers/routes/…) | ✅ Estructura clara |
| Documentación | README.md y OpenAPI | ✅ README y `docs/openapi.yaml` |

## 🧪 Resultados de pruebas (runner reciente)
- Assertions totales: **≈29**
- Fallas: **≈11–13** (dependiendo de ajustes locales)

**Principales hallazgos:**
1. **Login (admin) 400** → arrastra 401/404 en endpoints admin.
2. **GET /products?page=1&limit=10** → test exigía `limit/perPage/pageSize`; el backend devuelve `{ total, page, pages, data }`. Ajustar test o respuesta.
3. **DELETE /cart/:productId** → backend retorna **200** con JSON; test esperaba **204**. Ajustar test para aceptar 200/204 o cambiar handler.
4. **POST /orders** → en algunas corridas 500 por carrito vacío o precio faltante; controlador robusto recomendado valida 400 en lugar de 500.

> Con la colección “Full Runner MAX” y controladores robustos de carrito/órdenes, el número de fallos cae si el admin puede iniciar sesión.

## 🛠️ Recomendaciones de cierre
- Alinear `ADMIN_EMAIL/ADMIN_PASSWORD` de `.env` con usuario admin existente (o ejecutar script `ensureAdmin.js`).
- En OpenAPI, usar `servers: [ { url: "/api" } ]` para evitar puerto fijo.
- Normalizar respuestas del carrito (200/201 y 200/204 según acción) y documentarlo.
- En `/orders`, devolver 400 con mensaje útil si el carrito está vacío.

---

> Archivo generado automáticamente a partir del estado del .zip y observaciones de pruebas.

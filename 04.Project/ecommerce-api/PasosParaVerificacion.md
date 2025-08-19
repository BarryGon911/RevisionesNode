# Pasos para Verificación — API E‑commerce (Express + MongoDB)

Este documento guía un pase de verificación **paso a paso** para confirmar el cumplimiento de la rúbrica (pasos 1–4 y checklist 5).
Incluye comandos **cURL** y sugerencias para **Postman**. *Requisitos previos:* Node.js 18+, MongoDB (local o Atlas), y opcionalmente `jq` para formatear JSON en consola.

---

## 0) Preparación

```bash
# 0.1 Instalar dependencias
npm install

# 0.2 Variables de entorno
cambiarle el nombre al archivo: .env.example a .env
# Edita .env si usarás Atlas; por defecto:
# MONGODB_URI=mongodb://localhost:27017/ecommerce-api
# JWT_SECRET=superultramegasecreto
# SRV_PORT=3000

# 0.3 Cargar datos de ejemplo (≥ 10 por entidad)
npm run seed
# Esperado en consola: "✅ Datos sembrados: { categories: 10, products: 10, users: 10 }"

# 0.4 Levantar servidor
npm start
# Esperado en consola:
# "✅ Conectado a MongoDB"
# "🚀 Servidor escuchando en http://localhost:3000"
```

> Si `npm start` está ocupando la terminal, abre otra para ejecutar cURL.

---

## 1) Presentación breve (Rúbrica Paso 1)

- Abre **Evidencia.md** (incluido en el proyecto).
- Verifica que responde en extenso: **qué hace la API**, **estructura por carpetas**, **endpoints clave** y **revisión de código**.

---

## 2) Pruebas de funcionalidades principales (Rúbrica Paso 3)

> Puedes usar **Postman** (colección incluida en `postman/`) o **cURL**.
> En cURL, se muestran resultados esperados para marcar el checklist.

### 2.1 Autenticación (registro / login con JWT)

**Login admin (usuario del seed):**

```bash
curl -s -X POST http://localhost:3000/api/auth/login   -H "Content-Type: application/json"   -d '{"email":"admin@example.com","password":"Password123!"}'
# Esperado: { "token": "..." }  (guarda el valor de token)
```

**(Opcional) Registro cliente de prueba:**

```bash
curl -s -X POST http://localhost:3000/api/auth/register   -H "Content-Type: application/json"   -d '{"name":"Cliente Demo","email":"cliente.demo@example.com","password":"Password123!"}'
# Esperado: 201 Created, objeto de usuario (sin passwordHash)
```

**Login cliente:**

```bash
export TOKEN_CLIENTE=$(curl -s -X POST http://localhost:3000/api/auth/login   -H "Content-Type: application/json"   -d '{"email":"cliente.demo@example.com","password":"Password123!"}' | jq -r .token)
echo "TOKEN_CLIENTE=$TOKEN_CLIENTE"
# Esperado: token no vacío
```

### 2.2 Endpoints públicos

**Productos (paginado):**

```bash
curl -s "http://localhost:3000/api/products?page=1&limit=5" | jq .
# Esperado: objeto con keys: page, limit, total, items (items <= 5)
```

**Categorías (lista):**

```bash
curl -s http://localhost:3000/api/categories | jq length
# Esperado: >= 10  (del seed)
```

### 2.3 Endpoints protegidos (cliente)

**Perfil del usuario autenticado:**

```bash
curl -s http://localhost:3000/api/users/me   -H "Authorization: Bearer $TOKEN_CLIENTE" | jq .
# Esperado: datos del usuario autenticado (sin passwordHash)
```

**Flujo carrito → orden**

1) Obtener un `productId` existente:

```bash
PID=$(curl -s "http://localhost:3000/api/products?limit=1" | jq -r '.items[0]._id')
echo "PID=$PID"
```

2) **Agregar al carrito:**

```bash
curl -s -X POST http://localhost:3000/api/cart/items   -H "Authorization: Bearer $TOKEN_CLIENTE" -H "Content-Type: application/json"   -d "{"productId":"$PID","quantity":2}" | jq '.items | length'
# Esperado: >= 1
```

3) **Crear orden (desde carrito):**

```bash
curl -s -X POST http://localhost:3000/api/orders   -H "Authorization: Bearer $TOKEN_CLIENTE" -H "Content-Type: application/json"   -d '{}' | jq '.status, .total'
# Esperado: status "creada" y total > 0
```

4) **Listar mis órdenes:**

```bash
curl -s http://localhost:3000/api/orders/my   -H "Authorization: Bearer $TOKEN_CLIENTE" | jq 'length'
# Esperado: >= 1
```

### 2.4 Relaciones entre modelos

**Producto con categoría poblada:**

```bash
curl -s http://localhost:3000/api/products/$PID | jq '.category | keys'
# Esperado: objeto (populate), p.ej. ["_id","name","description","createdAt","updatedAt", ...]
```

### 2.5 Rutas de administración (requieren rol admin)

**Obtener token admin (seed):**

```bash
export TOKEN_ADMIN=$(curl -s -X POST http://localhost:3000/api/auth/login   -H "Content-Type: application/json"   -d '{"email":"admin@example.com","password":"Password123!"}' | jq -r .token)
echo "TOKEN_ADMIN=$TOKEN_ADMIN"
```

**Usuarios (paginado):**

```bash
curl -s "http://localhost:3000/api/users?page=1&limit=2"   -H "Authorization: Bearer $TOKEN_ADMIN" | jq '.items | length, .total'
# Esperado: items <= 2, total >= 1
```

**CRUD de categorías y productos (admin):**

```bash
# Crear categoría
CID=$(curl -s -X POST http://localhost:3000/api/categories   -H "Authorization: Bearer $TOKEN_ADMIN" -H "Content-Type: application/json"   -d '{"name":"Categoria API","description":"desde verificación"}' | jq -r '._id')
echo "CID=$CID"

# Crear producto con esa categoría
NEWPID=$(curl -s -X POST http://localhost:3000/api/products   -H "Authorization: Bearer $TOKEN_ADMIN" -H "Content-Type: application/json"   -d "{"name":"Producto API","price":99.9,"stock":10,"category":"$CID"}" | jq -r '._id')
echo "NEWPID=$NEWPID"

# (Opcional) Actualizar producto
curl -s -X PUT http://localhost:3000/api/products/$NEWPID   -H "Authorization: Bearer $TOKEN_ADMIN" -H "Content-Type: application/json"   -d "{"name":"Producto API Editado","price":79.9,"stock":20,"category":"$CID"}" | jq .

# (Opcional) Eliminar producto y categoría
# curl -s -X DELETE http://localhost:3000/api/products/$NEWPID -H "Authorization: Bearer $TOKEN_ADMIN"
# curl -s -X DELETE http://localhost:3000/api/categories/$CID -H "Authorization: Bearer $TOKEN_ADMIN"

# (Opcional) Listar todas las órdenes (admin)
curl -s http://localhost:3000/api/orders -H "Authorization: Bearer $TOKEN_ADMIN" | jq 'length'
```

---

## 3) Revisión de código (Rúbrica Paso 4)

Verifica en el código del proyecto:

- **Organización por capas/carpetas:** `src/models`, `src/controllers`, `src/routes`, `src/middlewares`, `src/utils`, `src/config`.
- **Validaciones:** uso de **express-validator** en rutas clave (auth, users, products, categories, cart, orders) y middleware `handleValidation`.
- **Autenticación/Autorización:** middleware **JWT** (`requireAuth`) y **roles** (`requireRole('admin')`).
- **Errores:** respuestas 400 (validación), 404 (recurso no encontrado) y 500 (catch‑all).

---

## 4) Checklist de Revisión (Paso 5)

Marca cada ítem conforme al resultado de las pruebas:

- [ ] **Funcionalidad de Endpoints**
  - [ ] Registro/Login con **JWT**
  - [ ] **Productos**: GET público, CRUD protegido (admin)
  - [ ] **Carrito**: agregar / actualizar / eliminar
  - [ ] **Usuarios**: CRUD básico protegido por token/rol
  - [ ] **Órdenes**: creación y listado por usuario
- [ ] **Relaciones y datos**
  - [ ] Productos asociados a **categorías**
  - [ ] Órdenes asociadas a **usuarios** y **productos**
  - [ ] **≥ 10** registros por entidad (seed)
  - [ ] Datos consistentes (FK válidas)
- [ ] **Seguridad y validación**
  - [ ] `express-validator` en rutas clave
  - [ ] JWT en middleware de autenticación
  - [ ] Manejo de errores **400–500**
- [ ] **Paginación**
  - [ ] Usuarios y productos con paginación
- [ ] **Organización del código**
  - [ ] Capas/carpetas y modularidad
- [ ] **Presentación/Demo**
  - [ ] Flujo explicado y pruebas en Postman
- [ ] **Extras**
  - [ ] `bcrypt` para contraseñas
  - [ ] **Roles** admin/cliente
  - [ ] `README.md` con instrucciones
- [ ] **Opcional (rubro opcional)**
  - [ ] **Swagger** disponible en `/docs` y `/openapi.json`

---

## 5) (Opcional) Smoke Test (bash)

Ejecuta todo el flujo en un tirón (Linux/macOS con `jq`):

```bash
set -e
ADMIN=$(curl -s -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@example.com","password":"Password123!"}' | jq -r .token)
curl -s "http://localhost:3000/api/users?page=1&limit=2" -H "Authorization: Bearer $ADMIN" >/dev/null
CID=$(curl -s -X POST http://localhost:3000/api/categories -H "Authorization: Bearer $ADMIN" -H "Content-Type: application/json" -d '{"name":"Categoria Smoke","description":"verificación"}' | jq -r '._id')
PID=$(curl -s -X POST http://localhost:3000/api/products -H "Authorization: Bearer $ADMIN" -H "Content-Type: application/json" -d "{"name":"Producto Smoke","price":55.5,"stock":5,"category":"$CID"}" | jq -r '._id')
curl -s -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d '{"name":"Cliente Smoke","email":"cliente.smoke@example.com","password":"Password123!"}' >/dev/null
CLIENTE=$(curl -s -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"email":"cliente.smoke@example.com","password":"Password123!"}' | jq -r .token)
curl -s -X POST http://localhost:3000/api/cart/items -H "Authorization: Bearer $CLIENTE" -H "Content-Type: application/json" -d "{"productId":"$PID","quantity":2}" >/dev/null
ORDEN=$(curl -s -X POST http://localhost:3000/api/orders -H "Authorization: Bearer $CLIENTE" -H "Content-Type: application/json" -d '{}' | jq -r ._id)
test "$ORDEN" != "null" && echo "Smoke OK: Orden creada $ORDEN"
```

---

## 6) Swagger (opcional)

- **UI:** `http://localhost:3000/docs`
- **Spec JSON:** `http://localhost:3000/openapi.json`
  La especificación documenta tags, parámetros de paginación, seguridad **JWT** y todos los endpoints existentes.

---

## 7) Postman (colección incluida)

1) Importa desde `postman/`:
   - `Ecommerce-API.postman_collection.json`
   - `Ecommerce-API.postman_environment.json`
2) Selecciona el **Environment** “Ecommerce Local”.
3) Ejecuta **Auth → Login (admin)** para popular `{{token_admin}}` y `{{token}}`.
4) Usa los folders **Admin** y **Protegido (cliente)** en orden sugerido (create category → create product → cart → order).

---

### Notas

- Si no tienes `jq`, puedes omitir `| jq ...` en los comandos; la verificación se hace sobre el **status** y/o visualmente.
- Para Atlas, cambia `MONGODB_URI` en `.env` al string de conexión correspondiente.

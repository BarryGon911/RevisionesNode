# Bienes Raíces MVC — Backend

## 📋 Descripción del Proyecto
Aplicación backend para la gestión de propiedades inmobiliarias, desarrollada con **Node.js**, **Express**, **Sequelize** y **MySQL** bajo el patrón **MVC**.

> Este README está alineado a la **Rubrica.md**, con enfoque backend. (Retos 08–11 y MongoDB pueden revisarse en otra sesión).

---

## ⚙️ Requisitos
- Node.js v18+
- MySQL 8+
- npm 9+

---

## 📄 Variables de Entorno
Crea un archivo `.env` en la raíz con:
```
BD_NOMBRE=tu_basedatos
BD_USER=tu_usuario
BD_PASS=tu_password
BD_HOST=localhost
PORT=3000
JWT_SECRET=una_clave_segura
```

---

## 🚀 Instalación y Ejecución
```bash
npm install
npm run db:importar   # Importar datos iniciales
npm start             # Iniciar servidor
```

Modo desarrollo (opcional, watchers Tailwind/webpack):
```bash
npm run dev
```

---

## 🧭 Rutas Principales
- **Web (Pug)**: `/`, `/auth`, `/propiedades`  
- **API JSON**: `/api/propiedades`

> Nota: Endpoints adicionales pueden existir/variar según configuración del proyecto.

---

## 🔒 Seguridad
- CSRF (`csurf`) para formularios web.
- `bcrypt` para hash de contraseñas.
- `express-validator` para validaciones.
- `jsonwebtoken` para JWT (si lo habilitas en endpoints API protegidos).

---

## 🧪 Pruebas automatizadas con Postman (cumple rúbrica)
Se incluyen **pruebas smoke** listas para importar/ejecutar:
- **Colección**: `postman/bienesraices_mvc_smoke_tests.postman_collection.json`
- **Environment**: `postman/bienesraices_local.postman_environment.json`

**Dónde colocarlos (compliance)**  
> Crea la carpeta **`postman/` en la raíz** del proyecto y guarda ahí ambos archivos.

**Descarga aquí**  
- Colección: [bienesraices_mvc_smoke_tests.postman_collection.json](/mnt/data/postman_exports/bienesraices_mvc_smoke_tests.postman_collection.json)
- Environment: [bienesraices_local.postman_environment.json](/mnt/data/postman_exports/bienesraices_local.postman_environment.json)

**Ejecución en Postman (GUI)**
1. Importa la colección y el environment.
2. Selecciona el environment **BienesRaíces Local**.
3. Ejecuta la colección (Collection Runner).

**Ejecución por CLI (Newman)**
```bash
# Global
npm i -g newman

# Ejecutar
newman run postman/bienesraices_mvc_smoke_tests.postman_collection.json   -e postman/bienesraices_local.postman_environment.json
```

**Qué validan estas pruebas**
- `GET /` → **200** + **Content-Type: text/html**.  
- `GET /api/propiedades` → **200** + **JSON array**; si hay elementos, el primero tiene `id`.

---

## 📦 Estructura
- `models/`, `controllers/`, `routes/`, `middleware/`, `config/`, `seed/`, `views/`, `public/`

---

## 📜 Licencia
MIT

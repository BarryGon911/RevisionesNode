# Bienes Raíces MVC — Backend

## 📋 Descripción del Proyecto
Aplicación backend para la gestión de propiedades inmobiliarias, desarrollada con **Node.js**, **Express**, **Sequelize** y **MySQL** bajo el patrón **MVC**.  
Incluye autenticación de usuarios, roles, gestión de propiedades, subida de imágenes y endpoints API protegidos.

> Este README está alineado a la **Rubrica.md**, excepto por el uso de MySQL en lugar de MongoDB.

---

## 📂 Estructura del Proyecto
- **models/** — Definiciones Sequelize y relaciones.
- **controllers/** — Lógica de negocio.
- **routes/** — Enrutadores Express.
- **middleware/** — Middlewares personalizados.
- **config/** — Configuración (DB).
- **seed/** — Datos iniciales y seeder.
- **views/** — Plantillas Pug.
- **public/** — Archivos estáticos.

---

## ⚙️ Requisitos Previos
- Node.js v18+
- MySQL 8+
- npm 9+

---

## 📄 Variables de Entorno
Crear `.env` en la raíz del proyecto con:

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

Modo desarrollo (watchers para CSS/JS con Tailwind + Webpack):
```bash
npm run dev
```

---

## 🛠 Scripts Disponibles
- `start` → Inicia servidor Express.
- `server` → Modo desarrollo con nodemon.
- `css` → Compila TailwindCSS.
- `js` → Empaqueta JS con Webpack.
- `dev` → Ejecuta CSS y JS en paralelo.
- `db:importar` → Importa datos iniciales.
- `db:eliminar` → Elimina datos de prueba.

---

## 📌 Endpoints Principales
### Web (Pug)
- `/` — Página principal.
- `/auth` — Registro, login, recuperación.
- `/propiedades` — Gestión de propiedades.

### API JSON
- `/api/propiedades` — Endpoints de propiedades.
- `/api/mensajes` — Envío de mensajes.

> Todos los endpoints protegidos requieren autenticación y permisos según rol.

---

## 🔒 Seguridad
- CSRF Protection (`csurf`)
- Hash de contraseñas (`bcrypt`)
- Validación de entradas (`express-validator`)
- Autenticación con JWT (`jsonwebtoken`)

---

## 📦 Dependencias
Este proyecto usa las siguientes dependencias de producción y desarrollo:

 (para qué se usan)

### Runtime (`dependencies`)
- **bcrypt** `^5.0.1` — Hash de contraseñas (guardar contraseñas de forma segura).
- **cookie-parser** `^1.4.6` — Lectura y parseo de cookies en las peticiones.
- **csurf** `^1.11.0` — Protección contra ataques CSRF en formularios.
- **dotenv** `^16.0.1` — Carga variables de entorno desde `.env`.
- **dropzone** `^5.9.3` — (Front) Helper JS para arrastrar/soltar archivos en formularios.
- **express** `^4.18.1` — Servidor HTTP y enrutamiento.
- **express-validator** `^6.14.0` — Validación y saneamiento de parámetros/JSON/form-data.
- **jsonwebtoken** `^8.5.1` — Generación y verificación de tokens JWT (autenticación).
- **multer** `^1.4.5-lts.1` — Subida/gestión de archivos (por ejemplo imágenes).
- **mysql2** `^2.3.3` — Driver MySQL para Sequelize.
- **nodemailer** `^6.7.5` — Envío de correos (confirmaciones, recuperación, etc.).
- **pug** `^3.0.2` — Motor de vistas para renderizar HTML desde plantillas.
- **sequelize** `^6.19.0` — ORM para modelar y consultar la base de datos.

### Desarrollo (`devDependencies`)
- **autoprefixer** `^10.4.7` — (Dev) Añade prefijos CSS según navegadores objetivo.
- **concurrently** `^7.2.0` — (Dev) Ejecutar procesos en paralelo (watchers).
- **nodemon** `^2.0.16` — (Dev) Reinicio automático del servidor al cambiar archivos.
- **postcss** `^8.4.13` — (Dev) Procesador de CSS.
- **postcss-cli** `^9.1.0` — (Dev) CLI para PostCSS.
- **tailwindcss** `^3.0.24` — (Dev) Framework utilitario CSS.
- **webpack** `^5.72.1` — (Dev) Empaquetador de JS estático.
- **webpack-cli** `^4.9.2` — (Dev) CLI de webpack.



---

## 📝 Pasos de Uso en Desarrollo
1. Configurar `.env`.
2. Instalar dependencias (`npm install`).
3. Cargar datos (`npm run db:importar`).
4. Arrancar servidor (`npm start`).
5. Acceder vía navegador o cliente HTTP.

---

## 📜 Licencia
MIT — Uso libre con fines educativos y comerciales.

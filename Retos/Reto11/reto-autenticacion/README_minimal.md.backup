# Reto11 – Autenticación con JWT (README mínimo corregido)
**Objetivo:** Cumplir únicamente lo relativo a Reto11: login que devuelve **JWT** y ruta **/perfil** protegida por token.

## Requisitos
- Node.js 18+
- Variables de entorno (`.env`):
  ```env
  SRV_PORT=3000
  JWT_SECRET=supersecreto
  JWT_EXPIRES=1h
  ```

## Instalación y arranque
```bash
npm install
npm run dev   # o: node server.js
```
El servidor muestra en consola: `http://localhost:3000` y monta rutas en `http://localhost:3000/api`.

## Endpoints del reto
### POST /api/auth/login
**Body JSON:**
```json
{
  "correo": "juan@correo.com",
  "contraseña": "123456"
}
```
**Respuesta (ejemplo):**
```json
{
  "success": true,
  "token": "<JWT>",
  "usuario": { "id": 1, "nombre": "Juan Pérez", "correo": "juan@correo.com", "rol": "usuario" }
}
```

### GET /api/perfil (protegido)
Encabezado:
```
Authorization: Bearer <JWT>
```
**Respuesta (ejemplo):**
```json
{
  "success": true,
  "usuario": { "id": 1, "nombre": "Juan Pérez", "correo": "juan@correo.com", "rol": "usuario", "ultimoAcceso": "<ISO>" }
}
```

## Datos de ejemplo
El archivo `data/usuarios.json` incluye usuarios listos para probar:
- `juan@correo.com` / `123456`
- `maria@correo.com` / `password123`

## Pruebas con Postman
Importa **Reto11.postman_collection.json**. Ejecuta primero **POST /auth/login**; la colección guardará el `{{jwt}}` y luego haz **GET /perfil** (ya agrega el header Authorization).

> Este README es minimalista y se limita al alcance de **Reto11** (login + ruta protegida con JWT).

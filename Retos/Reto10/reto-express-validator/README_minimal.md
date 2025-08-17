# Reto10 – Registro con express-validator (README mínimo corregido)
**Objetivo:** Cumplir **únicamente** lo relativo al Reto10: exponer `POST /api/registro` con validaciones usando **express-validator** y respuestas JSON coherentes (éxito/errores).

## Requisitos
- Node.js 18+
- (Opcional) Postman para importar la colección de pruebas

## Instalación y arranque
```bash
npm install
npm run dev   # o: node server.js
```
La API escucha por defecto en `http://localhost:3000` (o según `SRV_PORT`). La ruta base del reto es: `http://localhost:3000/api`.

## Endpoint del reto
### POST /api/registro
**Body (JSON) esperado:**
```json
{
  "nombre": "Usuario R10",
  "correo": "correo@example.com",
  "edad": 25,
  "contraseña": "secreta1"
}
```
> Si tu implementación usa `password`/`contrasena` en lugar de `contraseña`, ajusta el nombre del campo en el body. El alcance del reto es validar formato y rango, no el nombre exacto de la clave.

**Validaciones mínimas (express-validator):**
- `nombre`: requerido, mínimo 3 caracteres.
- `correo`: requerido, con formato de email válido.
- `edad`: requerida, numérica, en rango `[18, 99]`.
- `contraseña` (o `password`/`contrasena`): requerida, mínimo 6 caracteres.
- En caso de error: responder **400** con JSON `{ "success": false, "errors": [...] }`.
- En caso de éxito: **201/200** con `{ "success": true, "data": { ... } }` **sin exponer** la contraseña.

## Ejemplos de uso
### 1) Caso exitoso
```bash
curl -X POST http://localhost:3000/api/registro   -H "Content-Type: application/json"   -d '{"nombre":"UsuarioR10","correo":"test.r10@example.com","edad":25,"contraseña":"secreta1"}'
```

### 2) Error de validación (correo inválido)
```bash
curl -X POST http://localhost:3000/api/registro   -H "Content-Type: application/json"   -d '{"nombre":"UsuarioR10","correo":"mal","edad":25,"contraseña":"secreta1"}'
```

## Pruebas con Postman
Importa la colección: **Reto10.postman_collection.json** (si la estás usando). Incluye casos **exitosos** y **fallidos**:
- Registro OK
- Falla: nombre faltante
- Falla: nombre corto
- Falla: correo inválido
- Falla: edad <18 y >99
- Falla: contraseña corta

> README intencionalmente **minimalista** para enfocarse **solo** en Reto10.

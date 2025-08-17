# Evidencia de Pruebas – Reto11 (JWT) – Corregido
Fecha: 2025-08-17 03:24:13

## Alcance
Cumple **únicamente** con Reto11: autenticación con JWT, endpoint de **login** y ruta **protegida**.

## Base URL
- `http://localhost:3000/api`

## Credenciales de prueba (del proyecto)
- `correo`: `juan@correo.com`
- `contraseña`: `123456`
_(Fuente: `Retos/Reto11/reto-autenticacion/data/usuarios.json`.)_

## Casos (Postman)
1) **POST /auth/login** → obtiene `token`
   - Body JSON:
     ```json
     {
       "correo": "juan@correo.com",
       "contraseña": "123456"
     }
     ```
   - Esperado: **200**, `success=true`, y campo `token` no vacío.
   - Acción: guardar `{jwt}` con el token.

2) **GET /perfil** (protegido por JWT)
   - Header: `Authorization: Bearer {jwt}`
   - Esperado: **200**, `success=true`, objeto `usuario` con `id`, `nombre`, `correo`, `rol`.

## Evidencia resumida
- Se verifica **login** y posterior acceso a **perfil** con `Bearer token`.
- Errores controlados: falta token → 401; token inválido/expirado → 403/401 (según middleware).

## Checklist (Reto11)
- [x] Endpoint de **login** que emite **JWT**
- [x] Middleware `verificarToken` que valida el header `Authorization`
- [x] Ruta protegida `/perfil` que responde sólo con token válido
- [x] Colección Postman con extracción automática de `token` y uso en `Authorization`

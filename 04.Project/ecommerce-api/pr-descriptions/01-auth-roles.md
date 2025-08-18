
# PR: Auth & Roles — JWT + bcrypt
**Fecha:** 2025-08-18

## Resumen
Implementa autenticación JWT (registro, login, `GET /auth/me`) y autorización por **roles** (`admin`/`customer`) para avanzar cumplimiento de la Rúbrica.

## Contexto/Motivación
- Requisito de Rúbrica: seguridad (JWT) y control de acceso por rol.
- Evita exposición de endpoints sensibles (usuarios, catálogo administrativo).

## Alcance
**Incluye:**
- Módulo `auth` (JWT, strategy, guard)
- Hash de contraseñas con `bcrypt`
- Roles + `RolesGuard`
- Protección en `UsersController` (list/delete admin), `Products/Categories` (admin)

**No incluye:**
- UI ni front-end
- OAuth/social

## Cambios clave
- `src/auth/*`, `src/common/*`, `src/users/*`
- `ValidationPipe` global en `main.ts`
- `app.module.ts` integra módulos

## Configuración
Variables en `.env`:
```
JWT_SECRET=supersecretjwt
JWT_EXPIRES_IN=1h
```
Migración de datos: no requerida (usuarios nuevos se guardan con hash).

## Plan de pruebas
1. **Registro**: `POST /auth/register` → `{{ access_token }}`
2. **Login** admin: `POST /auth/login` (admin@mail.com / AdminPassw0rd!) → guarda `{{adminJwt}}`
3. **Me**: `GET /auth/me` con Bearer
4. **Rutas protegidas**: `GET /users` con admin → 200; sin token → 401
5. **Postman/Newman**: ejecutar carpeta **Auth** de la colección “ecommerce-api — Rúbrica (compliance)”

### Criterios de aceptación (DoD)
- Tokens emitidos y verificados
- Endpoints admin rechazan sin rol adecuado
- Suite de Postman (Auth) pasa

## Riesgos & Mitigación
- **JWT mal configurado** → valida `JWT_SECRET` por env y expira en 1h

## Rollback
Revertir commit y deshabilitar guard; datos no migratorios.

## Referencias
- `README.md` (setup)
- `Rubrica-Compliance.md` (evidencias)

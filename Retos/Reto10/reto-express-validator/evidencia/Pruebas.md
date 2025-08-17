# Evidencia de Pruebas – Reto10 (Registro con express-validator)
Fecha: 2025-08-17 02:08:09

## Alcance
Se valida **únicamente** lo pedido para el Reto10: un endpoint `POST /api/registro` con validaciones utilizando `express-validator` y respuestas JSON acordes.

## Precondiciones
- Servidor iniciado: `npm run dev` (SRV_PORT=3000 por defecto).
- Base URL de pruebas: `http://localhost:3000/api`.

## Casos de prueba (Postman)
1. **Registro OK** – Body válido (`nombre`, `correo`, `edad`, `contraseña`).
   - Esperado: **201/200**, `success=true`, **no** expone `contraseña` en `data`.
2. **Falla: nombre faltante** – `nombre` omitido.
   - Esperado: **400**, `success=false`, `errors[]` con campo `nombre`.
3. **Falla: nombre corto** – `nombre` de 2 caracteres.
   - Esperado: **400**, `errors[]` con mensaje de longitud mínima.
4. **Falla: correo inválido** – formato incorrecto.
   - Esperado: **400**, `errors[]` en `correo`.
5. **Falla: edad <18** y **edad >99**.
   - Esperado: **400** con mensajes correspondientes.
6. **Falla: contraseña corta (<6)**.
   - Esperado: **400**, `errors[]` en `contraseña`.

## Evidencia resumida
- Middleware `validarCampos` devuelve `400` con lista normalizada de errores.
- Controller **no devuelve** la contraseña en la respuesta (cumple seguridad básica).
- Las pruebas automatizadas verifican status y forma de respuesta JSON.

## Checklist de Cumplimiento (Reto10)
- [x] Ruta `POST /api/registro`
- [x] Validaciones con `express-validator` (`nombre`, `correo`, `edad`, `contraseña`).
- [x] Manejo de errores coherente (`400` con `errors[]`).
- [x] Respuesta de éxito sin exponer `contraseña`.
- [x] Colección Postman con casos **exitoso** y **fallidos**.

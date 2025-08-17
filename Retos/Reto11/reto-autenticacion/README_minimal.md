# Reto 11 - Autenticación con JWT

## Instrucciones mínimas

1. Levanta el servidor con:
   ```bash
   npm install
   npm start
   ```

2. Importa en Postman la colección:
   - `postman/Reto11.postman_collection.json`

3. Asegúrate de tener el archivo `.env` con:
   ```
   SRV_PORT=3000
   JWT_SECRET=tu_secreto
   ```

4. Ejecuta primero `POST /auth/login` para obtener el JWT,
   y después `GET /perfil` usando el token guardado en variables.

---

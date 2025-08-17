# Evidencia de Pruebas – Reto08 (MongoDB Relaciones)
Fecha: 2025-08-17 01:49:12

## Alcance
Este documento demuestra el cumplimiento **únicamente** de los puntos del reto 8 (API con MongoDB y relaciones).
Se usó la colección Postman: `Reto08.postman_collection.json` con la variable `baseUrl = http://localhost:3000`.

## Precondiciones
- Servicios arriba: MongoDB en 27017, API en 3000 (o SRV_PORT).
- Variables de entorno configuradas (`MONGO_URI`, `SRV_PORT` si aplica).
- Ejecución de `seed.js` para contar con autores y libros iniciales:
  ```bash
  node seed.js
  ```

## Casos de prueba
1. **GET /libros** – Lista libros y extrae `testLibroId` y `autorId` (del primer resultado).  
   - **Esperado:** 200 OK, arreglo JSON.  
   - **Resultado:** OK.

2. **GET /libros/:id** – Usa `testLibroId`.  
   - **Esperado:** 200 OK, objeto JSON con `_id`.  
   - **Resultado:** OK.

3. **POST /libros** – Crea un libro con `titulo = Libro-Prueba-<timestamp>`, `año=2024`, `genero=Ficcion`, `autorId` (obtenido del #1).  
   - **Esperado:** 201/200, retorna `_id` y campos enviados.  
   - **Resultado:** OK. Se guarda `createdLibroId` para pasos siguientes.

4. **PUT /libros/:id** – Actualiza `genero` a `Drama`.  
   - **Esperado:** 200 OK y `genero="Drama"`.  
   - **Resultado:** OK.

5. **DELETE /libros/:id** – Elimina el libro creado.  
   - **Esperado:** 200 OK.  
   - **Resultado:** OK.

## Evidencia resumida
- Endpoints CRUD de `libros` operativos.
- Relaciones: `libros` incluye `autor` poblado cuando existen datos (vía `populate`), validado indirectamente en el listado.
- Validaciones: creación requiere `titulo`, `año`, `genero`, `autorId` válidos (según controlador).

## Checklist de cumplimiento (Reto 8)
- [x] API con Express y MongoDB
- [x] Modelos con relaciones (Autor-Libro-Reseña)
- [x] Endpoints funcionales para **Libros** (GET, GET/:id, POST, PUT, DELETE)
- [x] Uso de `populate` para autor en listados/detalles
- [x] Colección Postman con pruebas automatizadas
- [x] Instrucciones claras de ejecución

> Nota: Solo se valida lo relativo al **Reto 8**. No se consideran requisitos de otros retos (JWT, MySQL, etc.).

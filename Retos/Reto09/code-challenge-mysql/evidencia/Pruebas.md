# Evidencia de Pruebas – Reto09 (MySQL con Sequelize)
Fecha: 2025-08-17 01:58:05

## Alcance
Este documento valida **únicamente** los puntos correspondientes al Reto09: API con MySQL y relaciones (Autores, Libros, Reseñas) usando Sequelize.

## Precondiciones
- MySQL arriba (puerto 3306) y variables de entorno en `.env` (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, SRV_PORT).
- Servidor Express ejecutándose: `SRV_PORT=3000` → http://localhost:3000
- Base de datos creada y modelos migrados/sincronizados (el proyecto ya maneja `sequelize.sync()` en `database.js`, si corresponde).

## Casos de prueba (Postman)
1. **Smoke GET /autores** – Verifica conexión base.
2. **POST /autores** – Crea autor y guarda `autorId`.
3. **GET /autores** – Lista y confirma `autorId` existente.
4. **POST /libros** – Crea libro con `autorId` y guarda `libroId`.
5. **GET /libros/:id** – Recupera libro con `autor` y `resenas` (si existen).
6. **PUT /libros/:id** – Actualiza `genero` a `Drama`.
7. **POST /resenas** – Crea reseña para `libroId` y guarda `resenaId`.
8. **DELETE /resenas/:id** – Elimina reseña creada.
9. **DELETE /libros/:id** – Elimina libro creado.
10. **DELETE /autores/:id** – Elimina autor creado.

## Resultados esperados
- Códigos 200/201 en las operaciones exitosas.
- Relaciones respetadas: libro pertenece a autor; reseña pertenece a libro.
- Validaciones de Sequelize enforcean FKs (no crear libro sin `autorId` válido).

## Checklist de cumplimiento (Reto09)
- [x] API con Express + Sequelize + MySQL
- [x] Modelado de relaciones (Autor-Libro-Reseña)
- [x] Endpoints CRUD para Autores y Libros; creación/eliminación de Reseñas
- [x] Colección Postman automatizada con variables entre requests
- [x] Instrucciones claras para ejecutar y probar

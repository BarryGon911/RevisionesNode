# Reto09 – API con MySQL y Relaciones (Guía mínima)
**Objetivo:** Cumplir únicamente lo relativo al Reto09 (MySQL con Sequelize): Autores, Libros y Reseñas.

## Requisitos
- Node.js 18+
- MySQL en ejecución (puerto 3306) y BD creada
- `.env` con:
  ```env
  DB_HOST=localhost
  DB_PORT=3306
  DB_NAME=retos
  DB_USER=root
  DB_PASSWORD=
  SRV_PORT=3000
  ```

## Arranque
```bash
npm install
npm run dev   # o: node server.js
```
La API sirve en `http://localhost:3000` por defecto.

## Endpoints necesarios
### Autores
- **POST** **`/autores`** – Crear autor
- **GET** **`/autores`** – Listar
- **GET** **`/autores/:id`** – Detalle
- **PUT** **`/autores/:id`** – Actualizar
- **DELETE** **`/autores/:id`** – Eliminar

### Libros
- **POST** **`/libros`** – Crear (requiere `autorId` válido)
- **GET** **`/libros`** – Listar
- **GET** **`/libros/:id`** – Detalle (incluye `autor` y `resenas` si existen)
- **PUT** **`/libros/:id`** – Actualizar
- **DELETE** **`/libros/:id`** – Eliminar

### Reseñas
- **POST** **`/resenas`** – Crear reseña para un `libroId`
- **DELETE** **`/resenas/:id`** – Eliminar reseña

## Pruebas (Postman)
Importa **`postman_collection.json`** y ejecuta las peticiones en orden. Se usan variables (`autorId`, `libroId`, `resenaId`) compartidas entre requests.

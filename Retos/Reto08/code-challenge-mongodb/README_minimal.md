# Reto08 – API con MongoDB y Relaciones (Guía mínima)
**Objetivo:** cumplir únicamente los puntos del Reto 8 (sin extras de otros retos).

## Requisitos
- Node.js 18+
- MongoDB en ejecución
- Variables de entorno en `.env` (ejemplo):
  ```env
  MONGO_URI=mongodb://localhost:27017/retos
  SRV_PORT=3000
  ```

## Instalación y arranque
```bash
npm install
npm run dev   # o: node server.js
```
La API escucha por defecto en `http://localhost:3000` (o `SRV_PORT`).

## Datos de ejemplo
Inserta datos iniciales para tener autores/libros válidos:
```bash
node seed.js
```

## Endpoints requeridos (solo Libros)
- **GET** `/libros` – Lista libros (incluye `autor` poblado si existe).
- **GET** `/libros/:id` – Detalle de un libro por ID.
- **POST** `/libros` – Crear libro. Body JSON ejemplo:
  ```json
  {
    "titulo": "Libro Ejemplo",
    "año": 2024,
    "genero": "Ficcion",
    "autorId": "REEMPLAZAR_POR_ID_VALIDO"
  }
  ```
- **PUT** `/libros/:id` – Actualizar campos (p.ej. `genero`).
- **DELETE** `/libros/:id` – Eliminar por ID.

> Para obtener un `autorId` válido, ejecuta el seed y toma el `_id` de `autor` en la respuesta de `GET /libros`.

## Pruebas con Postman
Importa `postman_collection.json`. Ejecuta las 5 solicitudes en orden.  
Las pruebas automáticas verifican códigos de estado y guardan variables (`autorId`, `createdLibroId`).

## Alcance limitado
Este README intencionalmente **omite** elementos no requeridos por el Reto 8 (p.ej. JWT, MySQL, carrito, etc.).

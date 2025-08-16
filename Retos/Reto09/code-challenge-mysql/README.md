# 📚 API REST de Autores, Libros y Reseñas

Este proyecto es un backend construido con **NodeJS**, **ExpressJS** y **Sequelize** para manejar información sobre autores, sus libros y reseñas de los libros. Utiliza **MySQL** como base de datos relacional.

## 🛠️ Tecnologías utilizadas

- NodeJS
- ExpressJS
- Sequelize (ORM)
- MySQL
- Dotenv

## 📁 Estructura del proyecto

```
code-challenge-mysql/
├── server.js
├── README.md
├── .env
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── autoresController.js
│   │   ├── librosController.js
│   │   └── resenasController.js
│   ├── models/
│   │   ├── Autor.js
│   │   ├── Libro.js
│   │   ├── Reseña.js
│   │   └── index.js
│   ├── routes/
│   │   ├── autoresRoutes.js
│   │   ├── librosRoutes.js
│   │   ├── resenasRoutes.js
│   │   └── index.js
│   └── seeders/
```

## ⚙️ Configuración

1. Crea un archivo `.env` en la raíz del proyecto:

`DB_HOST=localhost`

`DB_USER=root`

`DB_PASSWORD=aca va tu pwd`

`DB_NAME=biblioteca`

`DB_PORT=3306`

`SRV_PORT=3000`

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor:

```bash
node server.js
```

## 📌 Endpoints

### Autores

- `POST /autores`: Crear autor
- `GET /autores`: Obtener todos
- `GET /autores/:id`: Obtener por ID
- `PUT /autores/:id`: Actualizar
- `DELETE /autores/:id`: Eliminar

### Libros

- `GET /libros`: Obtener todos
- `GET /libros/:id`: Obtener por ID
- `POST /libros`: Crear libro
- `PUT /libros/:id`: Actualizar
- `DELETE /libros/:id`: Eliminar

### Reseñas

- `POST /resenas`: Crear reseña
- `DELETE /resenas/:id`: Eliminar reseña

## 📮 Importar colección en Postman

Importa el archivo `/postman/biblioteca.postman_collection.json` en Postman para probar los endpoints. Puedes colocarlo en la raíz del proyecto.

---

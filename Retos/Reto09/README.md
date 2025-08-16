# 🧠 Code Challenge: API con MySQL y Relaciones

## 🎯 Objetivo

Crear una API con Express.js y MySQL que maneje relaciones entre tres entidades: **Autores**, **Libros** y **Reseñas**. El reto consiste en implementar endpoints que trabajen con datos reales almacenados en MySQL utilizando Sequelize ORM.

**Relación del modelo:**

- Un **Autor** puede escribir múltiples **Libros** (One-to-Many)
- Un **Libro** pertenece a un **Autor** y puede tener múltiples **Reseñas** (One-to-Many)
- Una **Reseña** pertenece a un **Libro** (Many-to-One)

Con este reto practicarás:

- 🗄️ Conexión y operaciones con MySQL
- 🔗 Relaciones entre tablas (Foreign Keys)
- 📋 Modelos con Sequelize (Schemas y validaciones)
- 🎯 Include para cargar relaciones (JOINs)
- 🏗️ Arquitectura en capas con base de datos relacional

---

## 💻 Funcionalidad requerida

### Endpoints principales

```
GET /libros                    // Listar todos los libros con autor
GET /libros/:id               // Obtener un libro específico con reseñas
POST /libros                  // Crear un nuevo libro
PUT /libros/:id              // Actualizar un libro
DELETE /libros/:id           // Eliminar un libro
```

### Ejemplo de respuesta GET /libros

```json
[
  {
    "id": 1,
    "titulo": "Cien años de soledad",
    "año": 1967,
    "genero": "Realismo mágico",
    "autorId": 1,
    "autor": {
      "id": 1,
      "nombre": "Gabriel García Márquez",
      "nacionalidad": "Colombiano",
      "fechaNacimiento": "1927-03-06"
    }
  }
]
```

### Ejemplo de respuesta GET /libros/:id

```json
{
  "id": 1,
  "titulo": "Cien años de soledad",
  "año": 1967,
  "genero": "Realismo mágico",
  "autorId": 1,
  "autor": {
    "id": 1,
    "nombre": "Gabriel García Márquez",
    "nacionalidad": "Colombiano"
  },
  "reseñas": [
    {
      "id": 1,
      "comentario": "Una obra maestra de la literatura",
      "puntuacion": 5,
      "fecha": "2024-01-15",
      "libroId": 1
    }
  ]
}
```

---

## 📁 Estructura del proyecto

```
code-challenge-mysql/
├── server.js
├── src/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── index.js
│   │   ├── Autor.js
│   │   ├── Libro.js
│   │   └── Reseña.js
│   ├── controllers/
│   │   └── librosController.js
│   └── routes/
│       ├── index.js
│       └── librosRoutes.js
├── package.json
└── .env
```

---

## 🛠️ Configuración inicial

### 1. Dependencias necesarias

```bash
npm init -y
npm install express sequelize mysql2 dotenv
npm install -D nodemon sequelize-cli
```

### 2. Variables de entorno (.env)

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=biblioteca
DB_USER=root
DB_PASSWORD=tu_password
PORT=3000
```

### 3. Scripts en package.json

```json
{
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

## 🚀 Pasos para implementar

### 1. Configuración de base de datos (src/config/database.js)

- Conexión a MySQL usando Sequelize
- Configuración de opciones de conexión
- Manejo de errores de conexión

### 2. Modelos (src/models/)

**Autor.js**

```javascript
// Campos requeridos:
// - id (INTEGER, PRIMARY KEY, AUTO_INCREMENT)
// - nombre (STRING, NOT NULL)
// - nacionalidad (STRING, NOT NULL)
// - fechaNacimiento (DATE, NULLABLE)
```

**Libro.js**

```javascript
// Campos requeridos:
// - id (INTEGER, PRIMARY KEY, AUTO_INCREMENT)
// - titulo (STRING, NOT NULL, UNIQUE)
// - año (INTEGER, NOT NULL)
// - genero (STRING, NOT NULL)
// - autorId (INTEGER, FOREIGN KEY a Autor)
```

**Reseña.js**

```javascript
// Campos requeridos:
// - id (INTEGER, PRIMARY KEY, AUTO_INCREMENT)
// - comentario (TEXT, NOT NULL)
// - puntuacion (INTEGER, 1-5, NOT NULL)
// - fecha (DATE, DEFAULT NOW)
// - libroId (INTEGER, FOREIGN KEY a Libro)
```

### 3. Relaciones (src/models/index.js)

- Configurar asociaciones entre modelos
- One-to-Many y Many-to-One
- Configurar Foreign Keys

### 4. Controlador (src/controllers/librosController.js)

- `obtenerLibros()` - GET todos con include de autor
- `obtenerLibroPorId()` - GET uno con autor y reseñas
- `crearLibro()` - POST nuevo libro
- `actualizarLibro()` - PUT libro existente
- `eliminarLibro()` - DELETE libro

### 5. Rutas (src/routes/)

- Configurar todas las rutas CRUD
- Implementar router modular

### 6. Servidor (server.js)

- Configuración Express
- Sincronización con MySQL
- Middlewares necesarios
- Importar rutas

---

## 💡 Pistas de implementación

### Para conectar a MySQL:

```javascript
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL conectado");
    await sequelize.sync(); // Crear tablas
  } catch (error) {
    console.error("Error:", error.message);
  }
};
```

### Para definir modelos:

```javascript
import { DataTypes } from "sequelize";

const Libro = sequelize.define("Libro", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  año: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
```

### Para definir relaciones:

```javascript
// En src/models/index.js
Autor.hasMany(Libro, { foreignKey: "autorId", as: "libros" });
Libro.belongsTo(Autor, { foreignKey: "autorId", as: "autor" });

Libro.hasMany(Reseña, { foreignKey: "libroId", as: "reseñas" });
Reseña.belongsTo(Libro, { foreignKey: "libroId", as: "libro" });
```

### Para usar include (JOIN):

```javascript
// Obtener libro con autor
const libro = await Libro.findByPk(id, {
  include: [{ model: Autor, as: "autor" }],
});

// Obtener libro con autor y reseñas
const libro = await Libro.findByPk(id, {
  include: [
    { model: Autor, as: "autor" },
    { model: Reseña, as: "reseñas" },
  ],
});
```

### Para validar campos:

```javascript
// En el modelo
puntuacion: {
  type: DataTypes.INTEGER,
  allowNull: false,
  validate: {
    min: 1,
    max: 5
  }
}
```

---

## 🧪 Pruebas con navegador y datos

### 1. Crear la base de datos

```sql
CREATE DATABASE biblioteca;
```

### 2. Poblar con datos de prueba

Las tablas se crearán automáticamente con `sequelize.sync()`.

### 3. Probar endpoints

```
http://localhost:3000/libros                    // Listar todos
http://localhost:3000/libros/1                  // Ver uno específico
```

### 4. Verificar en MySQL

Usar MySQL Workbench, phpMyAdmin o CLI para verificar los datos.

---

## 🎁 Bonus (opcional)

### 1. Filtros avanzados

```
http://localhost:3000/libros?genero=Ficción
http://localhost:3000/libros?año=2020
http://localhost:3000/libros?autor=García
```

### 2. Paginación

```
http://localhost:3000/libros?page=1&limit=10
```

### 3. Búsqueda por texto

```
http://localhost:3000/libros?buscar=soledad
```

### 4. Ordenamiento

```
http://localhost:3000/libros?orden=año&dir=desc
```

---

## 📚 Conceptos clave

- **ORM**: Object-Relational Mapping con Sequelize
- **Associations**: Relaciones entre modelos (hasMany, belongsTo)
- **Include**: Cargar datos relacionados (equivalent a JOIN)
- **Migrations**: Control de versiones de base de datos
- **Validations**: Reglas de negocio en el modelo
- **Foreign Keys**: Claves foráneas para relaciones

---

## 📝 Checklist

- [ ] MySQL instalado y funcionando
- [ ] Base de datos 'biblioteca' creada
- [ ] Conexión a MySQL configurada
- [ ] Modelos definidos con DataTypes correctos
- [ ] Relaciones configuradas con associations
- [ ] Controlador implementado con operaciones CRUD
- [ ] Include funcionando correctamente
- [ ] Rutas configuradas siguiendo REST
- [ ] Validaciones implementadas
- [ ] Manejo de errores para IDs inválidos
- [ ] Servidor funcionando en puerto 3000
- [ ] Pruebas en navegador exitosas
- [ ] Datos persistiendo en MySQL

---

## 🚨 Errores comunes a evitar

1. **Conexión fallida**: Verificar credenciales de MySQL
2. **Base de datos inexistente**: Crear la base de datos manualmente
3. **Associations incorrectas**: Verificar que las relaciones estén bien definidas
4. **Include mal configurado**: Usar los alias correctos en las relaciones
5. **Validaciones faltantes**: Implementar todas las validaciones requeridas
6. **Foreign Key violations**: Verificar que los registros referenciados existan
7. **Sync problems**: Verificar que las tablas se creen correctamente

---

## 🔧 Herramientas recomendadas

- **MySQL Workbench**: Interfaz gráfica para MySQL
- **phpMyAdmin**: Interfaz web para administrar MySQL
- **Postman**: Para probar endpoints POST/PUT/DELETE
- **Sequelize CLI**: Para migraciones y seeders

---

## 🎯 Criterios de éxito

✅ Conexión exitosa a MySQL
✅ Modelos definidos correctamente
✅ Relaciones funcionando con include
✅ CRUD completo implementado
✅ Validaciones funcionando
✅ Datos persistiendo correctamente
✅ Manejo apropiado de errores

---

¡Domina MySQL y las relaciones relacionales! 🐬✨

**Tiempo estimado:** 90-120 minutos
**Dificultad:** Intermedio-Avanzado
**Herramientas:** Node.js, Express.js, MySQL, Sequelize, Navegador

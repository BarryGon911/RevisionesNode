# 🧠 Code Challenge: API con MongoDB y Relaciones

## 🎯 Objetivo

Crear una API con Express.js y MongoDB que maneje relaciones entre tres entidades: **Autores**, **Libros** y **Reseñas**. El reto consiste en implementar endpoints que trabajen con datos reales almacenados en MongoDB utilizando Mongoose.

**Relación del modelo:**

- Un **Autor** puede escribir múltiples **Libros**
- Un **Libro** pertenece a un **Autor** y puede tener múltiples **Reseñas**
- Una **Reseña** pertenece a un **Libro**

Con este reto practicarás:

- 🗄️ Conexión y operaciones con MongoDB
- 🔗 Relaciones entre documentos (Referencias)
- 📋 Modelos con Mongoose (Schema y validaciones)
- 🎯 Populate para cargar relaciones
- 🏗️ Arquitectura en capas con base de datos real

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
    "_id": "64a1b2c3d4e5f6789012345",
    "titulo": "Cien años de soledad",
    "año": 1967,
    "genero": "Realismo mágico",
    "autor": {
      "_id": "64a1b2c3d4e5f6789012340",
      "nombre": "Gabriel García Márquez",
      "nacionalidad": "Colombiano"
    }
  }
]
```

### Ejemplo de respuesta GET /libros/:id

```json
{
  "_id": "64a1b2c3d4e5f6789012345",
  "titulo": "Cien años de soledad",
  "año": 1967,
  "genero": "Realismo mágico",
  "autor": {
    "_id": "64a1b2c3d4e5f6789012340",
    "nombre": "Gabriel García Márquez",
    "nacionalidad": "Colombiano"
  },
  "reseñas": [
    {
      "_id": "64a1b2c3d4e5f6789012350",
      "comentario": "Una obra maestra de la literatura",
      "puntuacion": 5,
      "fecha": "2024-01-15"
    }
  ]
}
```

---

## 📁 Estructura del proyecto

```
code-challenge-mongodb/
├── server.js
├── src/
│   ├── config/
│   │   └── database.js
│   ├── models/
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
npm install express mongoose dotenv
npm install -D nodemon
```

### 2. Variables de entorno (.env)

```env
MONGO_URI=mongodb://localhost:27017/biblioteca
PORT=3000
```

### 3. Scripts en package.json

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

## 🚀 Pasos para implementar

### 1. Configuración de base de datos (src/config/database.js)

- Conexión a MongoDB usando Mongoose
- Manejo de errores de conexión
- Configuración de opciones

### 2. Modelos (src/models/)

**Autor.js**

```javascript
// Campos requeridos:
// - nombre (String, requerido)
// - nacionalidad (String, requerido)
// - fechaNacimiento (Date, opcional)
```

**Libro.js**

```javascript
// Campos requeridos:
// - titulo (String, requerido, único)
// - año (Number, requerido)
// - genero (String, requerido)
// - autorId (ObjectId, referencia a Autor)
```

**Reseña.js**

```javascript
// Campos requeridos:
// - comentario (String, requerido)
// - puntuacion (Number, 1-5, requerido)
// - fecha (Date, default: Date.now)
// - libroId (ObjectId, referencia a Libro)
```

### 3. Controlador (src/controllers/librosController.js)

- `obtenerLibros()` - GET todos con populate de autor
- `obtenerLibroPorId()` - GET uno con autor y reseñas
- `crearLibro()` - POST nuevo libro
- `actualizarLibro()` - PUT libro existente
- `eliminarLibro()` - DELETE libro

### 4. Rutas (src/routes/)

- Configurar todas las rutas CRUD
- Implementar router modular

### 5. Servidor (server.js)

- Configuración Express
- Conexión a MongoDB
- Middlewares necesarios
- Importar rutas

---

## 💡 Pistas de implementación

### Para conectar a MongoDB:

```javascript
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};
```

### Para definir schemas:

```javascript
import mongoose from "mongoose";

const libroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    unique: true,
  },
  autorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Autor",
    required: true,
  },
  // ... otros campos
});
```

### Para usar populate:

```javascript
// Cargar libro con autor
const libro = await Libro.findById(id).populate("autorId");

// Cargar libro con autor y reseñas
const libro = await Libro.findById(id).populate("autorId").populate("reseñas");
```

### Para validar ObjectId:

```javascript
import mongoose from "mongoose";

if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({ error: "ID inválido" });
}
```

---

## 🧪 Pruebas con navegador y datos

### 1. Poblar la base de datos

Crear algunos documentos de prueba directamente en MongoDB o con un script.

### 2. Probar endpoints

```
http://localhost:3000/libros                    // Listar todos
http://localhost:3000/libros/ID_DEL_LIBRO      // Ver uno específico
```

### 3. Verificar en MongoDB

Usar MongoDB Compass o mongosh para verificar que los datos se guarden correctamente.

---

## 🎁 Bonus (opcional)

### 1. Filtros avanzados

```
http://localhost:3000/libros?genero=Ficción
http://localhost:3000/libros?año=2020
http://localhost:3000/libros?autor=NOMBRE_AUTOR
```

### 2. Paginación

```
http://localhost:3000/libros?page=1&limit=10
```

### 3. Búsqueda por texto

```
http://localhost:3000/libros?buscar=PALABRA
```

### 4. Estadísticas

```
http://localhost:3000/libros/stats              // Contar por género, etc.
```

---

## 📚 Conceptos clave

- **Schema**: Estructura de documentos en Mongoose
- **Populate**: Cargar documentos relacionados
- **Referencias**: ObjectId que apunta a otros documentos
- **Validaciones**: Reglas de negocio en el modelo
- **Middleware**: Funciones que se ejecutan antes/después de operaciones
- **Índices**: Optimización de búsquedas

---

## 📝 Checklist

- [ ] MongoDB instalado y funcionando
- [ ] Conexión a base de datos configurada
- [ ] Modelos definidos con schemas correctos
- [ ] Relaciones configuradas con referencias
- [ ] Controlador implementado con operaciones CRUD
- [ ] Populate funcionando correctamente
- [ ] Rutas configuradas siguiendo REST
- [ ] Validaciones implementadas
- [ ] Manejo de errores para IDs inválidos
- [ ] Servidor funcionando en puerto 3000
- [ ] Pruebas en navegador exitosas
- [ ] Datos persistiendo en MongoDB

---

## 🚨 Errores comunes a evitar

1. **Conexión fallida**: Verificar que MongoDB esté corriendo
2. **ObjectId inválido**: Validar IDs antes de buscar
3. **Referencias rotas**: Verificar que los documentos referenciados existan
4. **Populate olvidado**: Recordar cargar relaciones cuando sea necesario
5. **Validaciones faltantes**: Implementar todas las validaciones requeridas
6. **Unique violations**: Manejar errores de campos únicos
7. **Variables de entorno**: Verificar que .env esté configurado

---

## 🔧 Herramientas recomendadas

- **MongoDB Compass**: Interfaz gráfica para MongoDB
- **Postman**: Para probar endpoints POST/PUT/DELETE
- **MongoDB Atlas**: Base de datos en la nube (alternativa local)

---

## 🎯 Criterios de éxito

✅ Conexión exitosa a MongoDB
✅ Modelos definidos correctamente
✅ Relaciones funcionando con populate
✅ CRUD completo implementado
✅ Validaciones funcionando
✅ Datos persistiendo correctamente
✅ Manejo apropiado de errores

---

¡Domina MongoDB y las relaciones de datos! 🍃✨

**Tiempo estimado:** 90-120 minutos
**Dificultad:** Intermedio-Avanzado
**Herramientas:** Node.js, Express.js, MongoDB, Mongoose, Navegador

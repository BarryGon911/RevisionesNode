# 🧠 Code Challenge: Relaciones entre Entidades

## 🎯 Objetivo

Crear una API con Express.js que maneje relaciones entre tres entidades: **Estudiantes**, **Cursos** y **Calificaciones**. El reto consiste en implementar un endpoint que retorne información completa combinando estas entidades relacionadas.

**Relación del modelo:**

- Un **Estudiante** puede tener múltiples **Calificaciones**
- Una **Calificación** pertenece a un **Estudiante** y a un **Curso**
- Un **Curso** puede tener múltiples **Calificaciones**

Con este reto practicarás:

- 🔗 Relaciones entre entidades (Foreign Keys)
- 🧮 Manipulación de arrays con `map()`, `find()` y `filter()`
- 🏗️ Arquitectura en capas (Data, Controlador, Rutas)
- ✅ Validación de datos relacionales
- 🛠️ Manejo de errores en relaciones

---

## 💻 Funcionalidad requerida

### Endpoint principal

```
GET /calificaciones
```

### Respuesta esperada

```json
[
  {
    "nombre": "Ana García",
    "curso": "Matemáticas",
    "calificacion": 95
  },
  {
    "nombre": "Ana García",
    "curso": "Historia",
    "calificacion": 88
  },
  {
    "nombre": "Luis Pérez",
    "curso": "Matemáticas",
    "calificacion": 92
  }
]
```

---

## 📁 Estructura del proyecto

```
code-challenge-relaciones/
├── server.js
├── data/
│   ├── estudiantes.js
│   ├── cursos.js
│   └── calificaciones.js
├── controllers/
│   └── calificacionesController.js
└── routes/
    ├── index.js
    └── calificacionesRoutes.js
```

---

## 🚀 Pasos para implementar

### 1. Datos de ejemplo (data/)

**data/estudiantes.js**

```javascript
// Estructura esperada:
// { id, nombre }
```

**data/cursos.js**

```javascript
// Estructura esperada:
// { id, nombre }
```

**data/calificaciones.js**

```javascript
// Estructura esperada:
// { id, estudianteId, cursoId, calificacion }
```

### 2. Controlador (controllers/calificacionesController.js)

- Función `obtenerCalificaciones`
- Combinar los tres arrays usando las relaciones
- Validar que existan las relaciones
- Manejar errores cuando no se encuentren datos

### 3. Rutas (routes/)

- Configurar ruta GET `/calificaciones`
- Implementar router modular siguiendo el patrón de clase

### 4. Servidor (server.js)

- Configuración básica de Express
- Middleware para JSON
- Importar y usar las rutas
- Puerto 3000

---

## 💡 Pistas de implementación

### Para encontrar datos relacionados:

```javascript
// Encuentra el estudiante de cada calificación
const estudiante = estudiantes.find((e) => e.id === calificacion.estudianteId);

// Encuentra el curso de cada calificación
const curso = cursos.find((c) => c.id === calificacion.cursoId);
```

### Para validar que existan relaciones:

```javascript
// Siempre verificar que se encontraron los datos
if (!estudiante || !curso) {
  // Manejar el error apropiadamente
}
```

### Para transformar los datos:

```javascript
// Crear el objeto con la estructura deseada
return {
  nombre: estudiante.nombre,
  curso: curso.nombre,
  calificacion: calificacion.calificacion,
};
```

---

## 🧪 Pruebas con navegador

### 1. Iniciar el servidor

```bash
node server.js
```

### 2. Probar en el navegador

Abre tu navegador y visita:

```
http://localhost:3000/calificaciones
```

### 3. Verificar respuesta

Deberías ver un JSON con todas las calificaciones extendidas.

### 4. Probar ruta principal (opcional)

```
http://localhost:3000/
```

Debería mostrar un mensaje de bienvenida.

---

## 🎁 Bonus (opcional)

### 1. Filtros por curso

```
http://localhost:3000/calificaciones?curso=Matemáticas
```

### 2. Filtros por estudiante

```
http://localhost:3000/calificaciones?estudiante=Ana
```

### 3. Calificaciones por encima de cierto valor

```
http://localhost:3000/calificaciones?minima=90
```

### 4. Validación de integridad

- Verificar que todas las calificaciones tengan estudiante válido
- Verificar que todas las calificaciones tengan curso válido
- Retornar error detallado si faltan relaciones

---

## 📚 Conceptos clave que necesitas

- **Foreign Key**: Referencia a ID de otra entidad
- **Join/Relación**: Combinar datos de múltiples arrays
- **map()**: Transformar cada elemento de un array
- **find()**: Buscar un elemento específico en un array
- **filter()**: Filtrar elementos que cumplen una condición
- **Arquitectura en capas**: Separar datos, lógica y rutas

---

## 📝 Checklist

- [ ] Archivos de datos creados con relaciones correctas
- [ ] Controlador implementado con lógica de combinación
- [ ] Rutas configuradas siguiendo patrón modular
- [ ] Servidor Express funcionando en puerto 3000
- [ ] Endpoint `/calificaciones` retorna datos combinados
- [ ] Validación de relaciones implementada
- [ ] Manejo de errores para datos faltantes
- [ ] Pruebas en navegador funcionando
- [ ] Ruta principal `/` configurada
- [ ] Bonus implementados (opcional)

---

## 🚨 Errores comunes a evitar

1. **IDs que no existen**: Verificar que `find()` encuentre resultados
2. **Estructura incorrecta**: Mantener nombres exactos en la respuesta
3. **Arrays vacíos**: Manejar casos donde no hay datos
4. **Puerto ocupado**: Verificar que el puerto 3000 esté libre
5. **Rutas incorrectas**: Usar exactamente `/calificaciones`
6. **Olvidar export/import**: Verificar que los módulos se exporten correctamente

---

## 🌍 Retos similares en plataformas

- **Codewars**: [Join Objects by ID](https://www.codewars.com/kata/582c297e56373f0426000098)
- **LeetCode**: [Combine Two Tables](https://leetcode.com/problems/combine-two-tables/)
- **HackerRank**: [SQL Join Practice](https://www.hackerrank.com/domains/sql/joins)

---

## 🎯 Criterios de éxito

✅ El servidor inicia sin errores
✅ La ruta `/calificaciones` responde correctamente
✅ Los datos se combinan apropiadamente
✅ La estructura JSON es la esperada
✅ Se manejan casos de error

---

¡Demuestra tu dominio de relaciones de datos! 🔗✨

**Tiempo estimado:** 45-60 minutos
**Dificultad:** Intermedio
**Herramientas:** Node.js, Express.js, Navegador

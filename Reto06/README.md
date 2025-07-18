# 🧠 Code Challenge: Contar propiedades de un objeto

## 🎯 Objetivo

Crear un servidor en Express.js que exponga una ruta `/contar` donde se reciba un objeto por JSON (POST) y devuelva cuántas propiedades tiene.

Con este reto practicarás:

- 📦 Envío y recepción de objetos en JSON
- 🧮 Manipulación de objetos en JavaScript
- 🚀 Implementación de rutas POST con Express
- ✅ Validación de datos de entrada
- 🛠️ Manejo de errores

---

## 💻 Instrucciones

### Ruta principal

```
POST http://localhost:3000/contar
```

### Ejemplo de petición

```json
{
  "nombre": "Ana",
  "edad": 25,
  "correo": "ana@example.com"
}
```

### Respuesta esperada

```json
{
  "propiedades": 3
}
```

---

## 📁 Estructura del proyecto

```
code-challenge-contar-objeto/
├── server.js
├── controllers/
│   └── contarController.js
└── package.json
```

---

## 🚀 Pasos para implementar

### 1. Configuración inicial

- Crear un servidor Express básico
- Configurar el middleware para parsear JSON
- Definir el puerto 3000

### 2. Controlador

- Crear función `contarPropiedades` en `controllers/contarController.js`
- Recibir el objeto del body de la petición
- Validar que sea un objeto válido
- Contar las propiedades
- Retornar el resultado

### 3. Rutas

- Configurar ruta POST `/contar`
- Opcional: Agregar ruta GET `/` para verificar el servidor

---

## 💡 Pistas útiles

### Para validar objetos:

```javascript
// Verificar que no sea null, que sea objeto y no array
if (!objeto || typeof objeto !== "object" || Array.isArray(objeto)) {
  // Retornar error
}
```

### Para contar propiedades:

```javascript
// Object.keys() devuelve un array con las claves
const cantidad = Object.keys(objeto).length;
```

### Para manejar errores:

```javascript
// Usar códigos de estado HTTP apropiados
return res.status(400).json({ error: "Mensaje de error" });
```

### Para recibir datos:

```javascript
// El objeto viene en req.body
const objeto = req.body;
```

---

## 🧪 Casos de prueba

### Usando cURL

**Prueba básica:**

```bash
POST http://localhost:3000/contar
body '{"nombre":"Ana","edad":25,"correo":"ana@example.com"}'
```

**Respuesta esperada:**

```json
{
  "propiedades": 3
}
```

**Objeto vacío:**

```bash
POST http://localhost:3000/contar
body '{}'
```

**Respuesta esperada:** `{"propiedades": 0}`

**Envío de array (debe dar error):**

```bash
POST http://localhost:3000/contar
body '["item1", "item2"]'
```

**Respuesta esperada:** Error 400 con mensaje apropiado

---

## 🎁 Bonus (opcional)

Implementa un parámetro query `detallado=true` que además del conteo, devuelva los nombres de las propiedades:

```
POST http://localhost:3000/contar?detallado=true
```

**Respuesta esperada:**

```json
{
  "propiedades": 3,
  "detalles": ["nombre", "edad", "correo"]
}
```

**Pista:** Usa `req.query.detallado` para obtener el parámetro.

---

## 📚 Conceptos clave que necesitas

- **Object.keys()**: Devuelve un array con las claves del objeto
- **typeof**: Verifica el tipo de dato
- **Array.isArray()**: Verifica si es un array
- **req.body**: Contiene los datos enviados en el cuerpo de la petición
- **req.query**: Contiene los parámetros de query (?key=value)
- **Códigos de estado HTTP**: 200 (OK), 400 (Bad Request)

---

## 📝 Checklist

- [ ] Servidor Express configurado en puerto 3000
- [ ] Middleware `express.json()` configurado
- [ ] Ruta POST `/contar` creada
- [ ] Controlador `contarPropiedades` implementado
- [ ] Validación de objeto válido
- [ ] Conteo de propiedades con `Object.keys()`
- [ ] Manejo de errores con códigos HTTP apropiados
- [ ] Pruebas con cURL funcionando
- [ ] Bonus implementado (opcional)

---

## 🚨 Errores comunes a evitar

1. **Olvidar `express.json()`**: Sin este middleware, `req.body` será undefined
2. **No validar entrada**: Siempre verificar que los datos sean correctos
3. **Usar `length` directo**: Los objetos no tienen `.length`, usar `Object.keys()`
4. **No manejar arrays**: Arrays son objetos en JavaScript, pero no queremos contarlos
5. **Códigos HTTP incorrectos**: Usar 400 para errores de validación

---

¡Mucha suerte y diviértete resolviendo este reto! 🔍✨

**Tiempo estimado:** 30-45 minutos

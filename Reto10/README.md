# 🔐 Reto 10: Registro de usuario con validaciones

> **Objetivo**: Crear un endpoint de registro que valide los datos enviados por el usuario utilizando `express-validator`.

## 🎯 Descripción del Reto

Implementar un sistema de registro de usuarios con validación robusta de datos usando `express-validator`. Este reto te ayudará a dominar las validaciones del lado del servidor, un aspecto crucial para la seguridad de las APIs.

---

## 🚧 Requisitos Técnicos

### **📍 Endpoint Principal**

- **Ruta**: `POST /registro`
- **Content-Type**: `application/json`
- **Body**: JSON con datos del usuario

### **🔍 Validaciones Requeridas**

| Campo           | Validación                          | Descripción             |
| --------------- | ------------------------------------ | ------------------------ |
| `nombre`      | ✅ Obligatorio, mínimo 3 caracteres | Nombre del usuario       |
| `correo`      | ✅ Formato de email válido          | Email único del usuario |
| `edad`        | ✅ Número entre 18 y 99             | Edad del usuario         |
| `contraseña` | ✅ Mínimo 6 caracteres              | Contraseña segura       |

---

## ✅ Criterios de Éxito

### **🚨 Si hay errores de validación:**

```json
{
  "success": false,
  "errors": [
    {
      "field": "nombre",
      "message": "El nombre debe tener al menos 3 caracteres"
    },
    {
      "field": "correo",
      "message": "Debe ser un correo válido"
    }
  ]
}
```

### **✅ Si todas las validaciones pasan:**

```json
{
  "success": true,
  "mensaje": "Usuario registrado con éxito",
  "data": {
    "nombre": "Juan Pérez",
    "correo": "juan@email.com",
    "edad": 25
  }
}
```

---

## 🏗️ Estructura Sugerida

```
reto-express-validator/
├── 📄 package.json
├── 🖥️ server.js              # Servidor principal
├── 📁 routes/
│   └── 🛣️ registro.js        # Rutas de registro
├── 📁 controllers/
│   └── 🎯 registroController.js  # Lógica del registro
├── 📁 middlewares/
│   └── 🛡️ validarCampos.js   # Middleware de validación
└── 📁 utils/
    └── 🔧 responseHelper.js   # Helper para respuestas
```

---

## 📦 Dependencias Necesarias

```bash
# Instalar dependencias principales
npm install express express-validator

# Dependencias de desarrollo (opcional)
npm install -D nodemon

# package.json scripts sugeridos
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

## 🧪 Ejemplos de Implementación

### **1. 🖥️ server.js**

```javascript
import express from "express";
import registroRoutes from "./routes/registro.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api", registroRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
```

### **2. 🛣️ routes/registro.js**

```javascript
import express from "express";
import { body } from "express-validator";
import { registrarUsuario } from "../controllers/registroController.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const router = express.Router();

// Validaciones
const validacionesRegistro = [
  body("nombre")
    .trim()
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

  body("correo")
    .isEmail()
    .withMessage("Debe ser un correo válido")
    .normalizeEmail(),

  body("edad")
    .isInt({ min: 18, max: 99 })
    .withMessage("La edad debe ser un número entre 18 y 99"),

  body("contraseña")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];

// Ruta POST /registro
router.post("/registro", validacionesRegistro, validarCampos, registrarUsuario);

export default router;
```

### **3. 🛡️ middlewares/validarCampos.js**

```javascript
import { validationResult } from "express-validator";

export const validarCampos = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
        value: error.value,
      })),
    });
  }

  next();
};
```

### **4. 🎯 controllers/registroController.js**

```javascript
export const registrarUsuario = (req, res) => {
  try {
    const { nombre, correo, edad, contraseña } = req.body;

    // Aquí iría la lógica para guardar en base de datos
    // Por ahora solo simulamos el éxito

    res.status(201).json({
      success: true,
      mensaje: "Usuario registrado con éxito",
      data: {
        nombre,
        correo,
        edad,
        // No devolver la contraseña por seguridad
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al registrar usuario",
    });
  }
};
```

---

## 🧪 Testing Manual

### **✅ Caso exitoso:**

```bash
curl -X POST http://localhost:3000/api/registro \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "correo": "juan@email.com",
    "edad": 25,
    "contraseña": "mipassword123"
  }'
```

### **❌ Caso con errores:**

```bash
curl -X POST http://localhost:3000/api/registro \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Jo",
    "correo": "email-invalido",
    "edad": 15,
    "contraseña": "123"
  }'
```

---

## 🔥 Retos Adicionales (Opcional)

### **🌟 Level Up:**

1. **Validación de contraseña fuerte**: Incluir mayúsculas, minúsculas y números
2. **Verificar email único**: Simular verificación de email duplicado
3. **Sanitización**: Limpiar datos de entrada (trim, escape)
4. **Rate limiting**: Limitar intentos de registro por IP
5. **Logs**: Registrar intentos de validación

### **🔧 Validaciones Extra:**

```javascript
// Contraseña fuerte
body("contraseña")
  .isLength({ min: 8 })
  .withMessage("Mínimo 8 caracteres")
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  .withMessage("Debe contener mayúscula, minúscula y número"),
  // Nombre sin números
  body("nombre")
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage("El nombre solo puede contener letras y espacios");
```

---

## 🌍 Recursos Adicionales

### **📚 Documentación:**

- [Express-Validator Docs](https://express-validator.github.io/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)

### **🎯 Ejercicios Similares:**

- [Validate form data - Codewars](https://www.codewars.com/kata/validate-form-data)
- [Input validation - HackerRank](https://www.hackerrank.com/domains/algorithms)

### **🔗 Referencias del Curso:**

- [Express Cheatsheet](../../05.Resources/03.Quick-Reference/express-cheatsheet.md)
- [Validation FAQ](../../05.Resources/05.FAQ/api-development.md#validación-de-datos)

---

## ✅ Checklist de Completado

- [ ] ✅ Servidor Express configurado
- [ ] 🛣️ Ruta POST /registro creada
- [ ] 🔍 Validaciones implementadas (nombre, correo, edad, contraseña)
- [ ] 🛡️ Middleware de validación funcionando
- [ ] 🎯 Controller con lógica de registro
- [ ] 📄 Respuestas JSON correctas (éxito y error)
- [ ] 🧪 Testing manual realizado
- [ ] 🚀 Casos edge manejados

---

**🎯 Tiempo estimado**: 2-3 horas
**📊 Dificultad**: ⭐⭐⭐ (Intermedio)
**🏷️ Tags**: `express-validator`, `validation`, `middleware`, `REST API`

---

_💡 **Pro tip**: Este patrón de validación es fundamental en aplicaciones reales. ¡Practica diferentes tipos de validaciones para dominar la técnica!_

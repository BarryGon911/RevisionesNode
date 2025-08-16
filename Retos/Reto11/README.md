# 🔑 Reto 11: Autenticación con JWT

> **Objetivo**: Implementar un flujo completo de autenticación en Express utilizando JSON Web Tokens (JWT).

## 🎯 Descripción del Reto

Crear un sistema de autenticación robusto que incluya login y protección de rutas usando JWT. Este reto te enseñará los fundamentos de la autenticación en APIs REST, un concepto esencial en el desarrollo backend.

---

## 🚧 Requisitos Técnicos

### **📍 Endpoints Requeridos**

#### **1. POST /login**

- **Función**: Autenticar usuario y generar token
- **Body**: `{ "correo": "email", "contraseña": "password" }`
- **Respuesta exitosa**: Token JWT
- **Respuesta error**: 401 Unauthorized

#### **2. GET /perfil**

- **Función**: Obtener datos del usuario autenticado
- **Header requerido**: `Authorization: Bearer <token>`
- **Respuesta exitosa**: Datos del usuario
- **Respuesta error**: 401/403 si token inválido

---

## 🧱 Estructura Sugerida

```
reto-autenticacion/
├── 📄 package.json
├── 🖥️ server.js              # Servidor principal
├── 📁 routes/
│   ├── 🛣️ auth.js            # Rutas de autenticación
│   └── 🛣️ perfil.js          # Rutas protegidas
├── 📁 controllers/
│   ├── 🎯 authController.js   # Lógica de auth
│   └── 🎯 perfilController.js # Lógica de perfil
├── 📁 middlewares/
│   └── 🛡️ verificarToken.js  # Middleware JWT
├── 📁 data/
│   └── 📊 usuarios.json       # Datos simulados
└── 🔧 .env                    # Variables de entorno
```

---

## 🧪 Datos de Prueba

### **📊 data/usuarios.json**

```json
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "correo": "juan@correo.com",
    "contraseña": "123456",
    "rol": "usuario"
  },
  {
    "id": 2,
    "nombre": "María García",
    "correo": "maria@correo.com",
    "contraseña": "password123",
    "rol": "admin"
  }
]
```

### **🔧 .env**

```env
PORT=3000
JWT_SECRET=mi_super_secreto_jwt_2025
JWT_EXPIRES_IN=24h
NODE_ENV=development
```

---

## 📦 Dependencias Necesarias

```bash
# Dependencias principales
npm install express jsonwebtoken dotenv

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

## 🧩 Implementación Completa

### **1. 🖥️ server.js**

```javascript
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import perfilRoutes from "./routes/perfil.js";

// Configurar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", perfilRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({
    message: "🔑 Servidor de autenticación JWT funcionando",
    endpoints: {
      login: "POST /api/auth/login",
      perfil: "GET /api/perfil",
    },
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
```

### **2. 🛣️ routes/auth.js**

```javascript
import express from "express";
import { login } from "../controllers/authController.js";

const router = express.Router();

// POST /api/auth/login
router.post("/login", login);

export default router;
```

### **3. 🎯 controllers/authController.js**

```javascript
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";

// Función para leer usuarios del archivo JSON
const leerUsuarios = async () => {
  try {
    const rutaUsuarios = path.join(process.cwd(), "data", "usuarios.json");
    const data = await fs.readFile(rutaUsuarios, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error leyendo usuarios:", error);
    return [];
  }
};

export const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    // Validar que se enviaron los campos requeridos
    if (!correo || !contraseña) {
      return res.status(400).json({
        success: false,
        error: "Correo y contraseña son requeridos",
      });
    }

    // Leer usuarios del archivo
    const usuarios = await leerUsuarios();

    // Buscar usuario por correo y contraseña
    const usuario = usuarios.find(
      (u) => u.correo === correo && u.contraseña === contraseña
    );

    if (!usuario) {
      return res.status(401).json({
        success: false,
        error: "Credenciales inválidas",
      });
    }

    // Generar token JWT
    const payload = {
      id: usuario.id,
      correo: usuario.correo,
      nombre: usuario.nombre,
      rol: usuario.rol,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "24h",
    });

    // Respuesta exitosa
    res.json({
      success: true,
      message: "Login exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
};
```

### **4. 🛡️ middlewares/verificarToken.js**

```javascript
import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  try {
    // Obtener token del header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: "Token no proporcionado",
      });
    }

    // Verificar formato: "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Formato de token inválido",
      });
    }

    // Verificar y decodificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Agregar información del usuario al request
    req.usuario = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "Token expirado",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({
        success: false,
        error: "Token inválido",
      });
    }

    return res.status(500).json({
      success: false,
      error: "Error verificando token",
    });
  }
};
```

### **5. 🛣️ routes/perfil.js**

```javascript
import express from "express";
import { obtenerPerfil } from "../controllers/perfilController.js";
import { verificarToken } from "../middlewares/verificarToken.js";

const router = express.Router();

// GET /api/perfil (protegida)
router.get("/perfil", verificarToken, obtenerPerfil);

export default router;
```

### **6. 🎯 controllers/perfilController.js**

```javascript
export const obtenerPerfil = (req, res) => {
  try {
    // El middleware verificarToken ya nos dio req.usuario
    const usuario = req.usuario;

    res.json({
      success: true,
      message: "Perfil obtenido exitosamente",
      data: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
        // Información adicional que quieras mostrar
        ultimoAcceso: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error obteniendo perfil:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
};
```

---

## 🧪 Testing Manual

### **1. ✅ Realizar Login**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "correo": "juan@correo.com",
    "contraseña": "123456"
  }'
```

**Respuesta esperada:**

```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nombre": "Juan Pérez",
    "correo": "juan@correo.com",
    "rol": "usuario"
  }
}
```

### **2. 🔐 Acceder al Perfil**

```bash
# Usar el token obtenido en el paso anterior
curl -X GET http://localhost:3000/api/perfil \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### **3. ❌ Casos de Error**

#### **Login con credenciales incorrectas:**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "correo": "noexiste@correo.com",
    "contraseña": "wrongpassword"
  }'
```

#### **Perfil sin token:**

```bash
curl -X GET http://localhost:3000/api/perfil
```

#### **Perfil con token inválido:**

```bash
curl -X GET http://localhost:3000/api/perfil \
  -H "Authorization: Bearer token_invalido"
```

---

## ✅ Criterios de Éxito

### **🔑 Login Exitoso**

```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "jwt_token_aqui",
  "usuario": {
    "id": 1,
    "nombre": "Juan Pérez",
    "correo": "juan@correo.com",
    "rol": "usuario"
  }
}
```

### **❌ Login Fallido**

```json
{
  "success": false,
  "error": "Credenciales inválidas"
}
```

### **👤 Perfil Exitoso**

```json
{
  "success": true,
  "message": "Perfil obtenido exitosamente",
  "data": {
    "id": 1,
    "nombre": "Juan Pérez",
    "correo": "juan@correo.com",
    "rol": "usuario",
    "ultimoAcceso": "2025-01-07T..."
  }
}
```

### **🚫 Acceso Denegado**

```json
{
  "success": false,
  "error": "Token no proporcionado"
}
```

---

## 🔥 Retos Adicionales (Opcional)

### **🌟 Level Up:**

1. **Hash de contraseñas**: Usar `bcrypt` en lugar de contraseñas en texto plano
2. **Refresh tokens**: Implementar sistema de refresh tokens
3. **Múltiples roles**: Middleware para verificar roles específicos
4. **Rate limiting**: Limitar intentos de login por IP
5. **Logout**: Blacklist de tokens para logout

### **🔧 Ejemplos Avanzados:**

```javascript
// Middleware para verificar rol admin
export const verificarAdmin = (req, res, next) => {
  if (req.usuario.rol !== "admin") {
    return res.status(403).json({
      success: false,
      error: "Acceso denegado: se requiere rol de administrador",
    });
  }
  next();
};

// Hash de contraseña con bcrypt
import bcrypt from "bcrypt";

const contraseñaHasheada = await bcrypt.hash(contraseña, 10);
const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
```

---

## 🌍 Recursos Adicionales

### **📚 Documentación:**

- [JWT.io](https://jwt.io/) - Debugger y documentación JWT
- [jsonwebtoken npm](https://www.npmjs.com/package/jsonwebtoken)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

### **🎯 Ejercicios Similares:**

- [Basic Authentication - Codewars](https://www.codewars.com/kata/basic-authentication)
- [JWT Auth Tutorial - freeCodeCamp](https://www.freecodecamp.org/news/how-to-make-jwt-authentication-with-express/)

### **🔗 Referencias del Curso:**

- [Authentication FAQ](../../05.Resources/05.FAQ/api-development.md#autenticación-jwt)
- [JWT Examples](../../05.Resources/03.Quick-Reference/jwt-examples.md)
- [Security Best Practices](../../05.Resources/02.Documentation/security.md)

---

## ✅ Checklist de Completado

- [ ] ✅ Servidor Express configurado con variables de entorno
- [ ] 🔑 Endpoint POST /login implementado
- [ ] 📊 Sistema de lectura de usuarios desde JSON
- [ ] 🎫 Generación de tokens JWT funcionando
- [ ] 🛡️ Middleware de verificación de token creado
- [ ] 👤 Endpoint GET /perfil protegido
- [ ] ❌ Manejo de errores (credenciales inválidas, token expirado, etc.)
- [ ] 🧪 Testing manual realizado con curl/Postman
- [ ] 📄 Respuestas JSON con formato consistente

---

## 💡 Conceptos Clave Aprendidos

- **🔐 Autenticación vs Autorización**
- **🎫 ¿Qué son los JWT?**
- **🛡️ Middlewares para proteger rutas**
- **🔑 Headers de autorización**
- **❌ Manejo de errores de seguridad**
- **⚙️ Variables de entorno para secretos**

---

**🎯 Tiempo estimado**: 3-4 horas
**📊 Dificultad**: ⭐⭐⭐⭐ (Intermedio-Avanzado)
**🏷️ Tags**: `jwt`, `authentication`, `middleware`, `security`, `express`

---

_🔒 **Pro tip**: La autenticación JWT es la base de la mayoría de aplicaciones web modernas. ¡Domina este concepto y tendrás una habilidad muy valorada!_

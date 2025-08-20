# ✅ Rúbrica de Revisión – Proyecto Integrador: API E-commerce con Express.js

Este documento será usado durante la revisión en vivo del proyecto final.

---

## 🧭 Paso a paso del flujo de revisión

1. **Presentación breve del proyecto (máx 5 minutos):**

   - ¿Qué hace tu API?
   - ¿Cómo está estructurada?
   - ¿Qué endpoints clave implementaste?

2. **Verificación de requisitos previos:**

   - Base de datos conectada y funcional
   - Al menos 10 registros por entidad (Productos, Usuarios, Categorías aunque no se usen todas las categorías en los productos)
   - Servidor Express corriendo correctamente
   - Endpoints listos para probar en Postman o similar

3. **Prueba de funcionalidades principales:**

   - Registro/login
   - Endpoints públicos (productos, categorías)
   - Endpoints protegidos (carrito, órdenes)
   - Relaciones entre modelos

4. **Revisión de código:**

   - Organización por capas
   - Validaciones y middlewares
   - Uso de JWT y protección de rutas

5. **Verificación de retos clave y extras (no ponderan, pero deben estar presentes)**

---

## 📋 Checklist de Revisión

| Categoría                       | Criterio                                                                        | Cumple |
| ------------------------------- | ------------------------------------------------------------------------------- | ------ |
| **Funcionalidad de Endpoints**  | Registro/Login funcional con JWT                                                |        |
|                                 | Productos: GET público, POST/PUT/DELETE (requiere token)                        |        |
|                                 | Carrito de compras funcional (agregar, actualizar, eliminar)                    |        |
|                                 | Usuarios: CRUD básico, acceso restringido por token                             |        |
|                                 | Órdenes: creación, listado por usuario                                          |        |
| **Relaciones y datos**          | Productos asociados a categorías                                                |        |
|                                 | Órdenes asociadas a usuarios y productos                                        |        |
|                                 | Al menos 10 registros por entidad principal                                     |        |
|                                 | Datos consistentes (FK válidas, sin campos vacíos)                              |        |
| **Seguridad y validación**      | Middleware de validación (`express-validator`) en rutas clave                   |        |
|                                 | Middleware de autenticación con JWT                                             |        |
|                                 | Manejo correcto de errores (400–500)                                            |        |
| **Paginación**                  | Listado de usuarios y productos con paginación implementada                     |        |
| **Organización del código**     | Separación clara por carpetas: `models`, `controllers`, `routes`, `middlewares` |        |
|                                 | Código modular, funciones separadas, uso de helpers si aplica                   |        |
| **Presentación de la demo**     | Explicación clara del flujo                                                     |        |
|                                 | Pruebas funcionales en vivo con Postman                                         |        |
| **Funcionalidades adicionales** | Uso de `bcrypt` para encriptar contraseñas                                      |        |
|                                 | Manejo de roles en modelo de usuario (admin/cliente)                            |        |
|                                 | Documentación básica en `README.md`                                             |        |

---

## 📝 Notas del Revisor

(Usa este espacio para observaciones importantes o recomendaciones)

```
[Espacio para notas del revisor...]
```

---

## 💡 Recomendaciones generales

- Recuerda usar variables de entorno (`.env`) para claves sensibles.
- Puedes agregar Swagger u OpenAPI para documentar tu API.
- No es necesario implementar frontend.

---

**📊 Puntuación Final**: **\_** / 24 puntos
**🎯 Estado** :

- ⭐ Excelente | 24 puntos |
- 👍 Muy bueno | 20-23 puntos |
- ✅ Aprobado | 16-19 puntos |
- ⚠️ Requiere ajustes | 12-15 puntos |
- ❌ No aprobado | 0-11 puntos |

- **📅 Fecha de inicio de revisiones**: \***\*\11\08\2025\*\***
- **📅 Fecha máxima de revisión**: \***\*\22\08\2025\*\***
- **📅 Fecha límite para completar tu proyecto Máximo puntaje 20**: \***\*\29\08\2025\*\***

** Recuerda que la revisión es una oportunidad para mejorar tu proyecto y recibir retroalimentación constructiva. ¡Buena suerte! **

** Recuerda que debes de terminar tu proyecto para poder iniciar con el último módulo del curso **



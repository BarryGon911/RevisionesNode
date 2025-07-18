# 💡 Code Challenge: Encuentra el número mayor (servidor HTTP)

## 🧠 Descripción

En este reto pondrás en práctica tu conocimiento de:

- Manipulación de arrays
- Rutas y query params en un servidor HTTP
- Validación de datos

---

## ✨ Objetivo

Crear un servidor HTTP en Node.js que escuche peticiones a la ruta:

```
GET http://localhost:3000/mayor?numeros=5,3,9,1
```

y devuelva una respuesta en JSON con el número mayor del arreglo.

---

## 🌐 Entrada y salida esperada

**Entrada:** Query param llamado `numeros`, con una lista separada por comas

**Salida esperada:**

```json
{
  "numeros": [5, 3, 9, 1],
  "mayor": 9
}
```

---

## 🧰 Requisitos

- Crear una carpeta `reto-mayor-servidor/`
- Crear un archivo `server.js`
- Crear un archivo `utils/encontrarMayor.js` con la función principal
- Validar que:
  - Se reciba el query param `numeros`
  - Todos los valores sean números válidos
  - Si falta el parámetro, responder con error 400 y mensaje claro

---

## ♻️ Estructura de carpetas sugerida

```
reto-mayor-servidor/
├── server.js
└── utils/
    └── encontrarMayor.js
```

---

## 🔢 Pistas

Puedes dividir la lógica en pasos:

1. Obtener la query string desde `req.url`
2. Separar los números con `.split(',')`
3. Convertir a números con `.map(Number)`
4. Usar `Math.max(...array)`

---

## 🧪 Recursos y retos similares

- [Codewars: Find Maximum](https://www.codewars.com/kata/577a98a6ae28071780000989)
- [HackerRank: Max Element](https://www.hackerrank.com/challenges/java-arraylist/problem)
- [LeetCode: Max Consecutive Ones](https://leetcode.com/problems/max-consecutive-ones/)

---

## 🚀 Extra (opcional)

- Agrega soporte a rutas POST (envío en el body)
- Ordena los números de mayor a menor
- Valida que no haya letras o datos nulos en el array

---

💲 **Criterios de evaluación:**

| Criterio       | Detalle                                                              |
| -------------- | -------------------------------------------------------------------- |
| ✅ Lógica clara | La función devuelve correctamente el número mayor                    |
| ✅ Validación   | Si no se pasa el query o si hay datos no válidos, responde con error |
| ✅ Buen formato | La respuesta tiene el formato JSON indicado                          |

---

✨ ¡Buena suerte! Recuerda: no es solo resolver el reto, sino **entender el proceso**. ✨


# 💡 Code Challenge: Invertir una Cadena (con servidor HTTP)

## 🧠 Descripción

En este desafío crearás un **servidor HTTP con Node.js** que reciba una cadena por la URL y devuelva su versión invertida. Así practicarás:

- 🧩 **Manipulación de strings** (lógica de programación)
- 🌐 **Manejo de rutas y peticiones HTTP**

---

## 🚀 Objetivo

Construir un servidor que responda a una petición como esta:

```
GET http://localhost:3000/invertir?texto=hola
```

Y retorne:

```json
{
  "original": "hola",
  "invertido": "aloh"
}
```

---

## 🧱 Estructura sugerida

```
code-challenge-invertir-cadena/
├── server.js
└── utils/
    └── invertir.js
```

---

## 🛠️ Pasos sugeridos

### 1. Crear la función invertirCadena

- Crea el archivo `utils/invertir.js`.
- Exporta una función llamada `invertirCadena`.
- Esta función debe recibir un string y retornar su versión invertida.
- 💡 Tip: puedes ayudarte de métodos como `split`, `reverse`, `join`, pero no es obligatorio.

### 2. Crear un servidor con Node.js

- Crea el archivo `server.js`.
- Usa `http.createServer` para crear un servidor básico.

### 3. Manejar la ruta `/invertir`

- Si la petición es a `/invertir` con el método GET:

  - Lee el parámetro `texto` de la URL.
  - Valida que venga incluido.
  - Usa la función `invertirCadena` para invertirlo.
  - Responde con un objeto JSON como este:

    ```json
    {
      "original": "ejemplo",
      "invertido": "olpmeje"
    }
    ```

---

## 🧪 ¿Cómo probar?

1. Ejecuta el servidor:

   ```sh
   node server.js
   ```

2. Visita en el navegador o usa curl/Postman:

   ```
   http://localhost:3000/invertir?texto=react
   ```

   **Resultado esperado:**

   ```json
   {
     "original": "react",
     "invertido": "tcaer"
   }
   ```

---

## 🌍 Retos similares en plataformas

- [Codewars: Reverse String (8 kyu)](https://www.codewars.com/kata/5168bb5dfe9a00b126000018)
- [LeetCode: Reverse String](https://leetcode.com/problems/reverse-string/)

---

## 🧨 Extras opcionales (si te sientes valiente)

- Valida que `texto` sea solo letras o números.
- Convierte el string a minúsculas antes de invertir.
- Agrega una ruta `/palindromo?texto=oso` que diga si es palíndromo.

  **Ejemplo de respuesta:**

  ```json
  {
    "palindromo": true
  }
  ```

---

¡Diviértete programando y practicando! 🚀

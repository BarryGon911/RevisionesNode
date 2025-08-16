# Reto10 - Registro de Usuarios con Express-Validator

## Descripción
Proyecto de ejemplo para registrar usuarios validando campos con express-validator.

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm run dev
```

El servidor escuchará en el puerto 3000.

## Endpoints

- **POST /api/registro**

  - **Body Parameters:**
    - `nombre` (string): Obligatorio, mínimo 3 caracteres.
    - `correo` (string): Obligatorio, formato email.
    - `edad` (number): Obligatorio, entre 18 y 99.
    - `contraseña` (string): Obligatorio, mínimo 6 caracteres.

  - **Respuestas:**
    - `200 OK`: Registro exitoso.
    - `400 Bad Request`: Errores de validación.

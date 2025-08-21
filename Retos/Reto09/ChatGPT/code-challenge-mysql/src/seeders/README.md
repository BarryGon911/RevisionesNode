# Seeders (JS)

Este folder contiene **todos los scripts JS** que interactúan con la BD vía Sequelize:
- Creación de datos (seed)
- Borrado del schema para pruebas
- Consultas derivadas de tus .sql (mismo nombre, extensión .js)

> Requisitos: Node 18+, `package.json` con `"type": "module"`, y tu conexión en `src/config/database.js`.

## Variables de entorno (.env)

Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`:

- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS`: credenciales y destino de la BD.
- `DB_DIALECT`: `mysql` o `mariadb`.
- `DB_LOGGING`: `true` para ver el SQL que ejecuta Sequelize.
- `DB_TIMEZONE`: zona horaria para lecturas/escrituras (`-06:00` para CDMX).

> **Tip:** También puedes usar `DATABASE_URL` (por ejemplo `mysql://user:pass@host:3306/db`) y omitir las variables separadas.

### Ejemplo de `src/config/database.js`

Asegúrate de que tu conexión lea el `.env` y exporte `sequelize`:

```js
import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  dialect: process.env.DB_DIALECT || "mysql",
  logging: process.env.DB_LOGGING === "true" ? console.log : false,
  timezone: process.env.DB_TIMEZONE || "+00:00",
  define: { freezeTableName: true },
});
```

> **Dependencias:** instala `sequelize` y `mysql2` (o `mariadb` si usas MariaDB), y `dotenv`:
> ```bash
> npm i sequelize mysql2 dotenv
> # o: npm i sequelize mariadb dotenv
> ```

## Uso

### Poblar y limpiar
- **Borrar schema**:  
  ```bash
  npm run db:drop
  ```
- **Poblar con datos de ejemplo** (idénticos a `poblar_db.sql` / `script_inserts.sql`):
  ```bash
  npm run db:seed
  ```

> `script_inserts.js` **reusa** `populateDB.js` para evitar duplicidad de datos entre archivos.

### Consultas (equivalentes a tus .sql)

- **Ranking de usuarios por reseñas y promedio**  
  ```bash
  npm run q:ranking-usuarios
  ```

- **Reseñas por autor (con argumento)**  
  ```bash
  npm run q:resenas-autor -- "Isabel Allende"
  ```
  Si omites el argumento, usa `"Gabriel García Márquez"` por defecto.

- **Top 5 libros por promedio y cantidad de reseñas**  
  ```bash
  npm run q:top5-libros
  ```

- **JOIN general (Resena + Usuario + Libro + Autor)**  
  ```bash
  npm run q:join
  ```

- **Ranking de autores**  
  ```bash
  npm run q:ranking-autores
  ```

- **Dump tabla por tabla**  
  ```bash
  npm run q:tablas
  ```

## Sincronizar el schema (solo desarrollo)

- **Sin tocar datos existentes** (crea lo que falte):
  ```bash
  npm run db:sync
  ```

- **Ajustar columnas/índices** (best effort, sin borrar datos):
  ```bash
  npm run db:sync:alter
  ```

- **Recrear todo** (DROPs + CREATEs, ⚠️ destruye datos):
  ```bash
  npm run db:sync:force
  ```

- **Ciclo completo de pruebas** (recrear y poblar):
  ```bash
  npm run db:reset
  ```

> Por seguridad, el script rechaza `--force` si `NODE_ENV=production`.

## Notas y duplicidades

- `script_inserts.sql` y `poblar_db.sql` insertan el **mismo set** de 80 registros.  
  En JS, **solo `populateDB.js`** mantiene la fuente de verdad, y `script_inserts.js` lo reutiliza.

- `query_join.sql` y `query_resenas_autor.sql` comparten el mismo JOIN a 4 tablas;  
  el segundo agrega filtro por autor. El JS acepta el autor como argumento CLI.

## Troubleshooting

- **Error de import**: verifica las rutas `../config/database.js` y `../models/index.js`.
- **Problemas con “ñ” o acentos en consola**: en salidas he normalizado alias a ASCII (p. ej., `resena`).
- **MySQL y checks de FK**: seeders desactivan `FOREIGN_KEY_CHECKS` temporalmente para truncados.

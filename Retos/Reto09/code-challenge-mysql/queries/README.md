# 📚 Queries Librería

Este paquete contiene un conjunto de queries SQL y un script de inserts para poblar y consultar una base de datos de **librería** con tablas de **Autores, Libros, Usuarios y Reseñas**.

## Archivos incluidos

### 1. `script_inserts.sql`

- Inserta **20 registros por tabla**:
  - `Autor`
  - `Libro`
  - `Usuario`
  - `Resena`
- Los datos están relacionados entre sí (cada reseña corresponde a un usuario y un libro válidos).

### 2. `query_join.sql`

- Une las cuatro tablas (`Autor`, `Libro`, `Usuario`, `Resena`).
- Devuelve las reseñas junto con:
  - El libro reseñado
  - Su autor
  - El usuario que la escribió
  - Fecha y calificación

### 3. `query_top5_libros.sql`

- Calcula los **5 libros con mejor promedio de calificación**.
- Incluye cantidad de reseñas y nombre del autor.

### 4. `query_resenas_autor.sql`

- Lista todas las reseñas de un **autor específico** (ejemplo: *Gabriel García Márquez*).
- Devuelve reseña, usuario, fecha y libro.

### 5. `query_ranking_usuarios.sql`

- Ranking de usuarios por número de reseñas escritas.
- Muestra también el promedio de calificaciones que otorgan.

### 6. `query_ranking_autores.sql`

- Ranking de autores según el **promedio de calificaciones de sus libros**.
- Incluye total de reseñas y cantidad de libros con reseñas.

## 🚀 Uso sugerido

1. Ejecutar primero `script_inserts.sql` para poblar las tablas.
2. Probar los distintos queries según lo que se desee analizar:
   - Exploración general → `query_join.sql`
   - Mejores libros → `query_top5_libros.sql`
   - Reseñas de un autor → `query_resenas_autor.sql`
   - Usuarios más activos → `query_ranking_usuarios.sql`
   - Ranking de autores → `query_ranking_autores.sql`

---

> ⚠️ Nota: si vuelves a correr los inserts varias veces, recuerda **limpiar las tablas** antes (`TRUNCATE` o `DELETE`) para evitar conflictos de IDs.

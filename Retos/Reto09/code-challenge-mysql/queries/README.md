# 📚 Queries Librería (README Único)

Este folder contiene **solo archivos .sql** con consultas de reporte y poblamiento para una base de datos de **librería** con tablas de **Autor, Libro, Usuario y Resena**. Incluye también un script de inserts para cargar datos de ejemplo.

## Archivos incluidos

- `script_inserts.sql` — Inserta **20 registros por tabla**: `Autor`, `Libro`, `Usuario`, `Resena`. Los datos están relacionados (cada reseña pertenece a un usuario y a un libro válidos).
- `query_join.sql` — JOIN de las cuatro tablas; devuelve cada reseña con su libro, autor, usuario, fecha y calificación.
- `query_top5_libros.sql` — Calcula los **5 libros** con mejor promedio de calificación (incluye cantidad de reseñas y nombre del autor).
- `query_resenas_autor.sql` — Lista reseñas de un **autor específico** (ej.: *Gabriel García Márquez*); muestra reseña, usuario, fecha y libro.
- `query_ranking_usuarios.sql` — Ranking de usuarios por número de reseñas y **promedio de calificaciones otorgadas**.
- `query_ranking_autores.sql` — Ranking de autores por **promedio de calificación** de sus libros; incluye total de reseñas y **cantidad de libros con reseñas**.
- `query-table-by-table.sql` — `SELECT *` de cada tabla para exploración rápida.

## 🚀 Uso sugerido

1. Ejecuta primero `script_inserts.sql` para poblar las tablas.
2. Prueba los distintos queries según lo que quieras analizar:
   - Exploración general → `query_join.sql`
   - Mejores libros → `query_top5_libros.sql`
   - Reseñas de un autor → `query_resenas_autor.sql`
   - Usuarios más activos → `query_ranking_usuarios.sql`
   - Ranking de autores → `query_ranking_autores.sql`
   - Dump tabla por tabla → `query-table-by-table.sql`

## ⚙️ Ejecución manual (MySQL/MariaDB)

Puedes ejecutar cualquier archivo `.sql` con el cliente de línea de comandos:

```bash
mysql -u <user> -p<password> -h <host> <database> < queries/query_ranking_autores.sql
```

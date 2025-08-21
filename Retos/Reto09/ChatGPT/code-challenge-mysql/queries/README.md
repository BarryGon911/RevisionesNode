# Queries (SQL)

Este folder contiene **solo archivos .sql** con consultas de reporte y poblamiento.

## Archivos

- `query_ranking_usuarios.sql`  
  Ranking de usuarios por cantidad de reseñas y promedio de calificación que otorgan.

- `query_resenas_autor.sql`  
  Reseñas por autor (JOIN de 4 tablas), filtrable por nombre de autor.

- `query_top5_libros.sql`  
  Top 5 libros por promedio de calificación (y desempate por cantidad de reseñas).

- `query-table-by-table.sql`  
  SELECT * de cada tabla (Autor, Libro, Usuario, Resena).

- `query_join.sql`  
  JOIN general de Resena + Usuario + Libro + Autor (sin filtro).

- `query_ranking_autores.sql`  
  Ranking de autores por promedio de calificación y volumen de reseñas.

- `script_inserts.sql`  
  INSERTS de ejemplo (20 autores, 20 libros, 20 usuarios, 20 reseñas).

## Duplicidad importante

- `script_inserts.sql` **duplica** el contenido de `poblar_db.sql`.  
  En el código JS (seeders) la **fuente de verdad** es `src/seeders/populateDB.js`.  
  Para ejecutar inserts desde Node:
  ```bash
  npm run db:seed
  ```
  (o `npm run q:inserts`, que reutiliza el seeder).

## Cómo ejecutar los SQL manualmente

Si quieres correr un .sql directo en MySQL/MariaDB:

```bash
mysql -u <user> -p<password> -h <host> <database> < queries/query_ranking_autores.sql
```

> Alternativa Node/Sequelize: usa el script homólogo en `src/seeders`:
> ```bash
> npm run q:ranking-autores
> ```

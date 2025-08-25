# README — src/seeders

Scripts de siembra de datos:
- `seed.js`: crea usuarios, categorías, productos, carritos y órdenes de ejemplo.
- (Opcional) `ensureAdmin.js`: crea/promueve admin con `ADMIN_EMAIL`/`ADMIN_PASSWORD` del `.env`.

Ejecuta con:
```bash
node --env-file=.env src/seeders/seed.js
node --env-file=.env src/seeders/ensureAdmin.js
```

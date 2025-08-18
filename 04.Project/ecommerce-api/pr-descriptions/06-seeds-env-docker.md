
# PR: Seeds, .env.example y docker-compose
**Fecha:** 2025-08-18

## Resumen
Seeds ≥10 por entidad (categorías y 20 productos), admin + 2 clientes, `.env.example` y `docker-compose.yml` para Mongo.

## Cambios
- `src/seeds/seed.ts`, `.env.example`, `docker-compose.yml`

## Plan de pruebas
- `npm run seed` imprime "Seed complete"
- Login admin y users funcionan

### DoD
- DB poblada y reproducible

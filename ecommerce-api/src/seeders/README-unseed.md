Limpieza de base de datos para el proyecto e-commerce (MongoDB/Mongoose).

Uso:

node --env-file=.env src/seeders/unseed.js --all

node --env-file=.env src/seeders/unseed.js --only=users,products

node --env-file=.env src/seeders/unseed.js --except=orders,carts

node --env-file=.env src/seeders/unseed.js --drop-db



Flags:

--all        Borra todas las colecciones conocidas (por defecto si no pasas only/except)

--only=...   Lista separada por comas (users,categories,products,carts,orders)

--except=... Lista separada por comas para excluir de la limpieza

--drop-db    dropDatabase() (equivalente a “tirar todo”)

--force      Permite ejecución si NODE_ENV=production

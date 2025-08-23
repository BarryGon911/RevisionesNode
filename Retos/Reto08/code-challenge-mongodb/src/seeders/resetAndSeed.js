// src/seeders/resetAndSeed.js
import mongoose from 'mongoose';
import { populateDB } from '#seeders/populateDB.js';

import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/biblioteca';

async function resetAndSeed() {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });

  const { name } = mongoose.connection;
  console.log(`Conectado a MongoDB (DB: ${name})`);

  console.log('Borrando base de datos completa...');
  await mongoose.connection.dropDatabase();
  console.log('Base de datos borrada');

  console.log('Ejecutando seed...');
  const result = await populateDB(); // si retornas conteos, los mostramos
  if (result) console.log('Resultado del seed:', result);

  console.log('Reset + Seed completado');
}

try {
  await resetAndSeed();
}
catch (err) {
  console.error('Error en reset+seed:', err?.stack || err);
  process.exitCode = 1;
}
finally {
  await mongoose.connection.close();
}
import mongoose from 'mongoose';

import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/biblioteca';

try {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  const { name } = mongoose.connection;
  console.log(`Conectado a MongoDB (DB: ${name})`);
  await mongoose.connection.dropDatabase();
  console.log('Base de datos borrada');
}
catch (err) {
  console.error('Error al borrar DB:', err?.stack || err);
  process.exitCode = 1;
}
finally {
  await mongoose.connection.close();
}
// src/config/db.js
import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from "dotenv";
import "dotenv/config";
dotenv.config();


export default async function connectDB(uri = process.env.MONGODB_URI) {
  if (!uri) throw new Error('MONGODB_URI no está definido');

  try {
    await mongoose.connect(uri);
    const { host, port, name } = mongoose.connection;
    console.log(
      '🟢',
      colors.bgGreen.black.bold(' MongoDB successfully connected '),
      colors.green(`on ${host}:${port}/${name}`)
    );
  } catch (error) {
    console.error(
      '🔴',
      colors.bgRed.white.bold(' MongoDB connection error '),
      colors.red(`→ ${error instanceof Error ? error.message : String(error)}`)
    );
    throw error; // deja que server.js decida si termina el proceso
  }
}

export default connectDB;
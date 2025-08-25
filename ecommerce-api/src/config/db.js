// SI FUNCIONA
// import mongoose from 'mongoose';

// export default async function connectDB() {
//   const uri = process.env.MONGODB_URI;
//   if (!uri) throw new Error('MONGODB_URI is not set');
//   await mongoose.connect(uri, { autoIndex: true });
//   console.log('MongoDB connected');
// }

// src/config/db.js
import mongoose from "mongoose";
import colors from "colors";

export default async function connectDB() {
  // Usa la variable documentada (MONGODB_URI). Acepta MONGO_URI como fallback.
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!uri) {
    const msg = "MONGODB_URI (o MONGO_URI) no está definida en .env";
    console.error(colors.bgRed.white.bold(msg));
    throw new Error(msg);
  }

  try {
    const { connection } = await mongoose.connect(uri, {
      autoIndex: true,
      // serverSelectionTimeoutMS: 10000,
    });

    const url = `${connection.host}:${connection.port}/${connection.name}`;
    console.log(
      colors.bgGreen.black.bold("MongoDB successfully connected", `on ${url}`)
    );

    return connection;
  }
  catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.error(
      colors.bgRed.white.bold("MongoDB connection error", `→ ${reason}`)
    );
    throw error;
  }
}
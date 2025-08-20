// import mongoose from "mongoose";
// import colors from "colors";
// import dotenv from "dotenv";
// import "dotenv/config";
// dotenv.config();

// export const connectDB = async () => {
//   try {
//     const { connection } = await mongoose.connect(process.env.MONGODB_URI);
//     // Construir la URL con variables de entorno
//     const url = `${connection.host}:${connection.port}/${connection.name}`;
//     // console.log(`MongoDB successfully connected on ${url}`));
//     console.log("🟢", colors.bgGreen.black.bold(" MongoDB successfully connected "), colors.green(`on ${url}`));
//     return "Ok"
//   } catch (error) {
//     // console.error("MongoDB connection error:"), colors.red(error instanceof Error ? error.message : String(error)));
//     console.error("🔴", colors.bgRed.white.bold(" MongoDB connection error "), colors.red(`→ ${err instanceof Error ? err.message : String(err)}`));
//     // Exit the process with Failure
//     process.exit(1);
//   };
// }

// export default connectDB;

import mongoose from 'mongoose';
import colors from 'colors';

export default async function connectDB(uri = process.env.MONGODB_URI) {
  if (!uri) {
    throw new Error('MONGODB_URI no está definido en las variables de entorno');
  }
  try {
    await mongoose.connect(uri);
    const { host, port, name } = mongoose.connection;
    console.log(
      '🟢',
      colors.bgGreen.black.bold(' MongoDB successfully connected '),
      colors.green(`on ${host}:${port}/${name}`)
    );
  }
  catch (error) {
    console.error(
      '🔴',
      colors.bgRed.white.bold(' MongoDB connection error '),
      colors.red(`→ ${error instanceof Error ? error.message : String(error)}`) // 👈 usar "error"
    );
    throw error; // re-lanza para que server.js decida si termina el proceso
  }
}

export default connectDB;
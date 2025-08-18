import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import "dotenv/config";
dotenv.config();

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    // Construir la URL con variables de entorno
    const url = `${connection.host}:${connection.port}/${connection.name}`;
    console.log(`MongoDB conectado exitosamente en ${url}`);
    return "Ok"
  } catch (error) {
    console.error("Error de conexión a MongoDB:"), colors.red(error instanceof Error ? error.message : String(error));
  // Exit the process with Failure
  process.exit(1);
  };
}

export default connectDB;
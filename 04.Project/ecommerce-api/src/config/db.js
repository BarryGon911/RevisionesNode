import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import "dotenv/config";
dotenv.config();

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);
    // Construir la URL con variables de entorno
    const url = `${connection.host}:${connection.port}/${connection.name}`;
    // console.log(`MongoDB successfully connected on ${url}`));
    console.log("🟢", colors.bgGreen.black.bold(" MongoDB successfully connected "), colors.green(`on ${url}`));
    return "Ok"
  } catch (error) {
    // console.error("MongoDB connection error:"), colors.red(error instanceof Error ? error.message : String(error)));
    console.error("🔴", colors.bgRed.white.bold(" MongoDB connection error "), colors.red(`→ ${err instanceof Error ? err.message : String(err)}`));
    // Exit the process with Failure
    process.exit(1);
  };
}

export default connectDB;
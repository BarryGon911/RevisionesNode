import mongoose from "mongoose";
import colors from "colors";

export async function connectDB(options = {}) {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!uri) {
    const msg = "MONGODB_URI (o MONGO_URI) no está definida en .env";
    console.error(colors.bgRed.white.bold(msg));
    throw new Error(msg);
  }

  // Si ya hay conexión abierta, reutilizarla
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(uri, {
      autoIndex: true,
      // serverSelectionTimeoutMS: 10000,
      ...options
    });

    const { host, port, name } = conn.connection;
    const url = `${host}:${port}/${name}`;
    console.log(colors.bgGreen.black.bold(`MongoDB successfully connected on ${url}`));

    return conn.connection;
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.error(colors.bgRed.white.bold(`MongoDB connection error → ${reason}`));
    throw error;
  }
}

export async function disconnectDB() {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log(colors.bgYellow.black.bold("MongoDB connection closed"));
    }
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.error(colors.bgRed.white.bold(`Error closing MongoDB connection → ${reason}`));
    throw error;
  }
}

export default connectDB;
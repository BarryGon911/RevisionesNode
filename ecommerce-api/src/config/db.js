// import mongoose from 'mongoose';

// export default async function connectDB() {
//   const uri = process.env.MONGODB_URI;
//   if (!uri) throw new Error('MONGODB_URI is not set');
//   await mongoose.connect(uri, { autoIndex: true });
//   console.log('MongoDB connected');
// }
import mongoose from "mongoose";
import colors from "colors";

import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    const url = `${connection.host}:${connection.port}/${connection.name}`;
    console.log(colors.bgGreen.black.bold("MongoDB successfully connected", `on ${url}`));
    return "Ok"
  }
  catch (error) {
    console.error(colors.bgRed.white.bold("MongoDB connection error ", `→ ${err instanceof Error ? err.message : String(err)}`));
    process.exit(1);
  };
}

export default connectDB;
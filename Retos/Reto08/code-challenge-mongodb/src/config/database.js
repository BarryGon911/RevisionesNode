import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    const url = `${connection.host}:${connection.port}/${connection.name}`;
    console.log("MongoDB successfully connected", `on ${url}`);
    return "Ok"
  }
  catch (error) {
    console.error("MongoDB connection error ", `→ ${err instanceof Error ? err.message : String(err)}`);
    process.exit(1);
  };
}

export default connectDB;
import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();

export const dbConnection = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);
    const url = `${connection.host}:${connection.port}/${connection.name}`;
    console.log(colors.bgGreen.black.bold("MongoDB successfully connected", `on ${url}`));
    return "Ok"
  }
  catch (error) {
    console.error(colors.bgRed.white.bold("MongoDB connection error", `â†’ ${err instanceof Error ? err.message : String(err)}`));
    // Exit the process with Failure
    process.exit(1);
  };
}

export default dbConnection;
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbConnection = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const db = process.env.MONGODB_DB || 'ecommerce-db';
  try {
    await mongoose.connect(`${uri}/${db}`);
    console.log(`MongoDB connected to ${uri}/${db}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default dbConnection;

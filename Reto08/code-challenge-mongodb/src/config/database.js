import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI no está definido en .env");
    await mongoose.connect(uri, {
      // opciones recomendadas por mongoose actuales por defecto
    });
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error al conectar MongoDB:", error.message);
    throw error;
  }
};

export default connectDB;
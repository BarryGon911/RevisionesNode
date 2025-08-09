import { Sequelize } from "sequelize";
import colors from "colors";
import dotenv from "dotenv";
import "dotenv/config";
dotenv.config();

const sequelize = new Sequelize (
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

// // Conexión a la DB sin COLORS
// export const connectDB = async () => {
//   try {
//     await sequelize.authenticate();
//     // Construir la URL con variables de entorno
//     const url = `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
//     console.log(`🟢 MySQL conectado exitosamente en ${url}`);
//     await sequelize.sync();
//   } catch (error) {
//     console.error(
//       "🔴 Error de conexión de MySQL:",
//       error instanceof Error ? error.message : String(error)
//     );
//     // Exit the process with failure
//     process.exit(1);
//   }
// };

// Conexión a la DB con COLORS
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    // Construir la URL con variables de entorno
    const url = `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    console.log(colors.bgBlue.cyan.italic.bold(`🟢 MySQL conectado exitosamente en ${url}`));
    await sequelize.sync();
  } catch (error) {
    console.error(
      colors.bgRed.white.bold("🔴 Error de conexión de MySQL:"),
      colors.red(error instanceof Error ? error.message : String(error))
    );
    // Exit the process with Failure
    process.exit(1);
  }
};

export default connectDB;
export { sequelize };
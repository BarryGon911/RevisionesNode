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

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(colors.bgBlue.cyan.italic.bold("🟢 MySQL está Conectado"));
    await sequelize.sync();
  }
  catch (error) {
    console.error(colors.bgRed.white.bold("🔴 Error de conexión de MySQL:"), colors.red(error instanceof Error ? error.message : String(error)));
    process.exit(1);
  };
}

export { sequelize };
export default connectDB;
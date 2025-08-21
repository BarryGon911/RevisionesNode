import { sequelize } from "../config/database.js";

const dropAll = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    const qi = sequelize.getQueryInterface();
    await qi.dropAllTables();
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    console.log("?? Schema eliminado por completo.");
    process.exit(0);
  }
  catch (error) {
    console.error("? Error al eliminar schema:", error);
    process.exit(1);
  }
};

dropAll();
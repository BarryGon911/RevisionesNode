// src/seeders/sync.js
import "dotenv/config";
import { sequelize } from "../config/database.js";
import { Autor, Libro, Usuario, Resena } from "../models/index.js";

const main = async () => {
  const useAlter = process.argv.includes("--alter");
  const useForce = process.argv.includes("--force");
  const isProd = process.env.NODE_ENV === "production";

  if (useAlter && useForce) {
    console.error("❌ No combines --alter y --force. Usa solo uno.");
    process.exit(1);
  }
  if (useForce && isProd) {
    console.error("❌ Por seguridad, rechazo --force en producción (NODE_ENV=production).");
    process.exit(1);
  }

  try {
    console.log("🔌 Conectando a la base de datos…");
    await sequelize.authenticate();
    console.log(`🔧 Sincronizando modelos (options: ${useAlter ? "alter " : ""}${useForce ? "force " : ""})…`);
    await sequelize.sync({ alter: useAlter, force: useForce });
    void Autor && void Libro && void Usuario && void Resena;
    console.log("✅ Sincronización completada.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error en sync:", err);
    process.exit(1);
  }
};

main();

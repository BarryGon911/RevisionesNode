// src/server.js
import dotenv from 'dotenv';
import colors from 'colors';
import app from './app.js';
import connectDB from './config/db.js';

dotenv.config(); // cargar .env una sola vez

const PORT = process.env.SRV_PORT || 3000;

(async () => {
  try {
    await connectDB(); // o: await connectDB(process.env.MONGODB_URI)
    console.log('BD connection OK');
  } catch (error) {
    console.error(
      'BD connection failed:',
      error instanceof Error ? error.message : String(error)
    );
    process.exit(1);
  }
})();

app.listen(PORT, () => {
  console.log(
    colors.bgMagenta.magenta.italic.bold(
      `🚀🟢🚀 NodeJS Server running on http://localhost:${PORT}`
    )
  );
});

// (opcional) endurecer proceso
process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION:', reason);
  process.exit(1);
});
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
  process.exit(1);
});
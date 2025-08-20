import colors from 'colors';
import app from './config';
import connectDB from '../src/config/db.js';

import dotenv from 'dotenv';
dotenv.config(); // que sea el único dotenv.config() de tu app

const PORT = process.env.SRV_PORT || 3000;

(async () => {
  try {
    await connectDB(); // o connectDB(process.env.MONGODB_URI)
    console.log('BD connection OK');
  } catch (error) {
    console.error('BD connection failed:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
})();

app.listen(PORT, () => {
  console.log(colors.bgMagenta.magenta.italic.bold(`🚀🟢🚀 NodeJS Server running on http://localhost:${PORT}`));
});
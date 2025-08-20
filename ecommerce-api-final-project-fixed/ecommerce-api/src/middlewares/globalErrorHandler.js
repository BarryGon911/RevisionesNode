import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const setupGlobalErrorHandlers = () => {
  const logFilePath = path.join(__dirname, '../../logs/error.log');
  const logDir = path.dirname(logFilePath);
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

  const writeLog = (message) => {
    try {
      fs.appendFileSync(logFilePath, message + '\n');
    } catch (e) {
      console.error('Failed to write error log:', e.message);
    }
  };

  process.on('uncaughtException', (err) => {
    writeLog(`[uncaughtException] ${new Date().toISOString()} | ${err.stack || err.message}`);
  });

  process.on('unhandledRejection', (reason) => {
    writeLog(`[unhandledRejection] ${new Date().toISOString()} | ${reason?.stack || reason}`);
  });
};

export default setupGlobalErrorHandlers;

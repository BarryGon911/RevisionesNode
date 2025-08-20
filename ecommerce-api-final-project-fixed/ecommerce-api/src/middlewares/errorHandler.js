import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const errorHandler = (err, req, res, next) => {
  const logFilePath = path.join(__dirname, '../../logs/error.log');
  const logDir = path.dirname(logFilePath);
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

  const message = `${new Date().toISOString()} | ${req.method} ${req.url} | ${err.message} | ${err.stack}`;
  try {
    fs.appendFileSync(logFilePath, message + '\n');
  } catch (e) {
    console.error('Failed to write into log file:', e.message);
  }

  if (res.headersSent) return;
  const status = err.status || 500;
  res.status(status).json({
    status: 'error',
    message: status === 500 ? 'Internal Server Error' : err.message,
  });
};

export default errorHandler;

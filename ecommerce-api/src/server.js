import 'dotenv/config';
import { app } from './app.js';
import connectDB from '#config/db.js';

const port = process.env.PORT || 4000;

(async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
    console.log(`📚 Docs: http://localhost:${port}/api/docs`);
  });
})().catch((e) => {
  console.error('❌ Failed to start server', e);
  process.exit(1);
});

import colors from "colors";
import connectDB from "#config/db.js";
import { app } from "./app.js";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 4000;

(async () => {
  await connectDB();
  
  app.listen(port, () => {
    //console.log(`Server running on http://localhost:${port}`);
    console.log(colors.bgMagenta.italic.bold(`NodeJS Server running on http://localhost:${port}`));
    console.log(colors.bgYellow.italic.bold(`Swagger Docs on: http://localhost:${port}/api/docs`));
  });
})().catch((e) => {
  console.error(colors.bgRed.white.bold("Failed to start NodeJS Server", e));
  process.exit(1);
});

import express from "express";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();

const port = process.env.SRV_PORT || 4000;// Default port if not specified by Hosting Provider when deploying the application
const app = express();

app.use(express.json());
app.use("/api", routes);

app.listen(port, () => {
  console.log(colors.bgMagenta.magenta.italic.bold(`NodeJS server is running on http://localhost:${port}`));
});

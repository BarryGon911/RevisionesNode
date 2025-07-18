import express from "express";
import dotenv from "dotenv";
import routes from "./src/routes/index.js";
import connectDB from "./src/config/db.js";
import logger from "./src/middlewares/logger.js";
import colors from "colors";

dotenv.config();

const port = process.env.PORT || 4000;// Default port if not specified by Hosting Provider when deploying the application

const app = express();
connectDB();
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("WELCOME!");
});
app.use('/api', routes);

app.listen(port, () => {
  console.log(colors.bgMagenta.magenta.italic.bold(`NodeJS server is running on http://localhost:${port}`));
});


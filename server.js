import express from "express";
import morgan from "morgan";

import { makeSQLConnection, makeSQLDatabase } from "./utils/mysql.js";
import { makeMongoDatabase, makeMongoConnection } from "./utils/mongodb.js";

const app = express();
const PORT = process.env.PORT || 8003;

app.use(express.json());

app.use(async (request, response, next) => {
  request.sqiConnction = await makeSQLConnection();
  request.mongoConnetion = await makeMongoConnection();
  next();
});

app.use(morgan("tiny"));

app.get("/", async (req, res) => {
  res.json({
    message: "Welcome to Product List API",
    version: "1.0.0",
  });
});

app.listen(PORT, async () => {
  await makeSQLDatabase();
  await makeMongoDatabase();
  console.log(`Server is running on port ${PORT}...`);
});

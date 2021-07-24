const express = require("express");
const { createServer } = require("http");
const { Sequelize } = require("sequelize");
const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = require("./config/config");

const app = express();

const sequelize = new Sequelize(
  `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
);

sequelize
  .authenticate()
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("<h2>Hi there!!!</h2>");
});

const server = createServer(app);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server is running on port ${port} !`);
});

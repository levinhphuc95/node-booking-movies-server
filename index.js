const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();

app.use(cors());

app.use(express.json());

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.get("/", (req, res) => {
  res.send("<h2>Hi there!!!</h2>");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port} !`);
});

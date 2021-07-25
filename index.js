const express = require("express");
const cors = require("cors");
const db = require("./models");
const { rootRouter } = require("./routers/root.router");

const app = express();

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.use(cors());

app.use(express.json());

app.use("/api", rootRouter);

app.get("/", (req, res) => {
  res.send("<h2>Hi there!!!</h2>");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port} !`);
});

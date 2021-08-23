const express = require("express");
const ticketRouter = express.Router();
const { createMovieShowtime } = require("../controllers/ticket.controller");
const { logFeature } = require("../middlewares/log/log-feature.middlewares");

ticketRouter.post(
  "/TaoLichChieu",
  logFeature("tạo lịch chiếu"),
  createMovieShowtime
);

module.exports = {
  ticketRouter,
};

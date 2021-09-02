const express = require("express");
const ticketRouter = express.Router();
const {
  createMovieShowtime,
  layDanhSachPhongVe,
  datVe,
} = require("../controllers/ticket.controller");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");
const { logFeature } = require("../middlewares/log/log-feature.middlewares");

ticketRouter.post(
  "/TaoLichChieu",
  logFeature("tạo lịch chiếu"),
  authenticate,
  authorize(["ADMIN"]),
  createMovieShowtime
);

ticketRouter.get(
  "/LayDanhSachPhongVe",
  authenticate,
  authorize(["ADMIN"]),
  layDanhSachPhongVe
);
ticketRouter.post("/DatVe", authenticate, datVe);

module.exports = {
  ticketRouter,
};

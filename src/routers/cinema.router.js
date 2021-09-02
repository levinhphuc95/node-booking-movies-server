const express = require("express");
const cinemaRouter = express.Router();
const {
  createCineplex,
  getListCineplex,
  getListCinemaWithCineplex,
  createCinena,
  layThongTinLichChieuHeThongRap,
  layThongTinLichChieuPhim,
} = require("../controllers/cinema.controller");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");


cinemaRouter.get(
  "/LayThongTinHeThongRap",
  authenticate,
  authorize(["ADMIN"]),
  getListCineplex
);

cinemaRouter.get(
  "/LayThongTinCumRapTheoHeThong",
  authenticate,
  authorize(["ADMIN"]),
  getListCinemaWithCineplex
);

cinemaRouter.get(
  "/LayThongTinLichChieuHeThongRap",
  authenticate,
  authorize(["ADMIN"]),
  layThongTinLichChieuHeThongRap
);
cinemaRouter.get(
  "/LayThongTinLichChieuPhim",
  authenticate,
  authorize(["ADMIN"]),
  layThongTinLichChieuPhim
);

cinemaRouter.post("/ThemHeThongRap", createCineplex);
cinemaRouter.post("/ThemRap", createCinena);

module.exports = {
  cinemaRouter,
};

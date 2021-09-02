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

cinemaRouter.get("/LayThongTinHeThongRap", getListCineplex);

cinemaRouter.get("/LayThongTinCumRapTheoHeThong", getListCinemaWithCineplex);

cinemaRouter.get("/LayThongTinLichChieuHeThongRap", layThongTinLichChieuHeThongRap);

cinemaRouter.get("/LayThongTinLichChieuPhim", layThongTinLichChieuPhim);

cinemaRouter.post(
  "/ThemHeThongRap",
  authenticate,
  authorize(["QuanTri"]),
  createCineplex
);
cinemaRouter.post(
  "/ThemRap",
  authenticate,
  authorize(["QuanTri"]),
  createCinena
);

module.exports = {
  cinemaRouter,
};

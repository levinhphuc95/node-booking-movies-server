const express = require("express");
const cinemaRouter = express.Router();
const { createCineplex, getListCineplex, getListCinemaWithCineplex, createCinena } = require("../controllers/cinema.controller");
const { logFeature } = require("../middlewares/log/log-feature.middlewares");

cinemaRouter.get(
  "/LayThongTinHeThongRap",
  logFeature("lấy danh sách hệ thống rạp"),
  getListCineplex
);

cinemaRouter.get(
  "/LayThongTinCumRapTheoHeThong",
  getListCinemaWithCineplex
);

cinemaRouter.post("/ThemHeThongRap", createCineplex);
cinemaRouter.post("/ThemRap", createCinena);
module.exports = {
  cinemaRouter,
};

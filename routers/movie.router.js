const express = require("express");

const movieRouter = express.Router();
const {
  createMovie,
  getListMoive,
  removeMovies,
  updateMovies,
  getDetailMovie,
  uploadImgMovie,
} = require("../controllers/movie.controller");
const { logFeature } = require("../middlewares/log/log-feature.middlewares");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");

const {
  uploadImageSingle,
} = require("../middlewares/uploads/upload-image.middlewares");

movieRouter.get(
  "/LayDanhSachPhim",
  logFeature("lấy danh sách phim"),
  authenticate,
  authorize(["ADMIN"]),
  getListMoive
);

movieRouter.get(
  "/LayThongTinPhim/:maPhim",
  authenticate,
  logFeature("lấy thông tin phim"),
  authenticate,
  authorize(["ADMIN"]),
  getDetailMovie
);

movieRouter.post("/ThemPhim", authenticate, authorize(["ADMIN"]), createMovie);

// movieRouter.post("/UpLoadHinhAnhPhim", uploadImageSingle(), uploadImgMovie);

movieRouter.delete(
  "/XoaPhim/:maPhim",
  authenticate,
  authorize(["ADMIN"]),
  removeMovies
);

movieRouter.put(
  "/CapNhatPhim/:maPhim",
  authenticate,
  authorize(["ADMIN"]),
  updateMovies
);

module.exports = {
  movieRouter,
};

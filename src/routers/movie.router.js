const express = require("express");

const movieRouter = express.Router();
const {
  createMovie,
  getListMoive,
  removeMovies,
  updateMovies,
  getDetailMovie,
  uploadImgMovie,
  getListMoviePagination,
  getListMoiveByDay,
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
  getListMoive
);

movieRouter.get("/LayDanhSachPhimTheoNgay", getListMoiveByDay);

movieRouter.get("/LayThongTinPhim/:maPhim", getDetailMovie);

movieRouter.get("/LayDanhSachPhimPhanTrang", getListMoviePagination);

movieRouter.post(
  "/ThemPhim",
  authenticate,
  authorize(["QuanTri"]),
  createMovie
);

movieRouter.post(
  "/UpLoadHinhAnhPhim",
  uploadImageSingle(),
  authenticate,
  authorize(["QuanTri"]),
  uploadImgMovie
);

movieRouter.delete(
  "/XoaPhim/:maPhim",
  authenticate,
  authorize(["QuanTri"]),
  removeMovies
);

movieRouter.put(
  "/CapNhatPhim/:maPhim",
  authenticate,
  authorize(["QuanTri"]),
  updateMovies
);

module.exports = {
  movieRouter,
};

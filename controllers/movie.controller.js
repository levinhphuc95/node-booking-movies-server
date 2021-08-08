require("dotenv").config();
const { removeAccents } = require("../middlewares/utils/removeAccent");
const { movies } = require("../models");

// Lấy danh sách phim
const getListMoive = async (req, res) => {
  try {
    const movieList = await movies.findAll();
    res.status(200).send(movieList);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Lấy thông tin phim
const getDetailMovie = async (req, res) => {
  const { maPhim } = req.params;
  try {
    const movieDetail = await movies.findAll({ where: { maPhim } });
    res.status(200).send(movieDetail);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Thêm phim
const createMovie = async (req, res) => {
  const { tenPhim, trailer, moTa, ngayKhoiChieu, danhGia } = req.body;
  // Không được bỏ trống tên phim
  if (!tenPhim) {
    return res.status(400).send("Tên phim không được bỏ trống");
  }
  try {
    // tạo mã phim:
    const maPhim = Math.floor(Math.random() * 10000);
    // tạo bí danh mới:
    const biDanh = removeAccents(tenPhim);
    // định dạng ngày:
    const newMovie = await movies.create({
      maPhim,
      tenPhim,
      biDanh,
      trailer,
      moTa,
      ngayKhoiChieu,
      danhGia,
    });
    res.status(201).send(newMovie);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Cập nhật thông tin phim
const updateMovies = async (req, res) => {
  const { maPhim } = req.params;
  const { tenPhim, trailer, moTa, ngayKhoiChieu, danhGia } = req.body;
  const biDanh = removeAccents(tenPhim);
  try {
    await movies.update(
      { tenPhim, biDanh, trailer, moTa, ngayKhoiChieu, danhGia },
      {
        where: {
          maPhim,
        },
      }
    );
    res.status(200).send("Cập nhật thành công");
  } catch (error) {
    res.status(500).send(error);
  }
};

// Xóa phim:
const removeMovies = async (req, res) => {
  const { maPhim } = req.params;
  console.log(req.parmas);
  try {
    await movies.destroy({
      where: {
        maPhim,
      },
    });
    res.status(200).send("Xóa phim thành công");
  } catch (error) {
    res.status(500).send(error);
  }
};

// Upload Hình ảnh phim
// const uploadImgMovie = async (req, res) => {
//   const { file } = req;
//   const { maPhim } = req.body;
//   console.log(maPhim);
//   const urlImage = "http://localhost:5000/" + file.path;
//   // lưu link hinh xuống db
//   try {
//     const movieDetail = await movies.findAll({ where: { maPhim } });
//     // console.log(movieDetail)
//     movieDetail.hinhAnh = urlImage;
//     res.send(movieDetail);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

module.exports = {
  createMovie,
  getListMoive,
  removeMovies,
  updateMovies,
  getDetailMovie,
  uploadImgMovie,
};

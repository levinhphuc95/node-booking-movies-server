require("dotenv").config();
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

// Lấy danh sách người dùng phân trang:
const getListMoviePagination = async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.soTrang);
  const sizeAsNumber = Number.parseInt(req.query.soPhanTuTrenTrang);

  let soTrang = pageAsNumber;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    soTrang = pageAsNumber;
  }

  let soPhanTuTrenTrang = sizeAsNumber;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
    soPhanTuTrenTrang = sizeAsNumber;
  }
  try {
    const movieListPagination = await movies.findAndCountAll({
      limit: soPhanTuTrenTrang,
      offset: soTrang * soPhanTuTrenTrang,
    });
    res.status(200).send({
      currentPages: soTrang,
      count: soPhanTuTrenTrang,
      totalPages: Math.ceil(movieListPagination.count / soPhanTuTrenTrang),
      totalCounts: movieListPagination.count,
      items: movieListPagination.rows,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Thêm phim
const createMovie = async (req, res) => {
  const { tenPhim, trailer, biDanh, moTa, ngayKhoiChieu, danhGia } = req.body;
  // Không được bỏ trống tên phim
  if (!tenPhim) {
    return res.status(400).send("Tên phim không được bỏ trống");
  }
  try {
    // tạo mã phim:
    const maPhim = Math.floor(Math.random() * 10000);
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
const uploadImgMovie = async (req, res) => {
  const { file } = req;
  const { maPhim } = req.body;
  const urlImage = "http://localhost:5000/" + file.path;
  // lưu link hinh xuống db
  try {
    const movieDetailId = await movies.findOne({ where: { maPhim } });
    const movieDetail = await movies.findByPk(movieDetailId.dataValues.id);
    movieDetail.hinhAnh = urlImage;
    await movieDetail.save();
    res.send(movieDetail);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createMovie,
  getListMoive,
  removeMovies,
  updateMovies,
  getDetailMovie,
  uploadImgMovie,
  getListMoviePagination,
};

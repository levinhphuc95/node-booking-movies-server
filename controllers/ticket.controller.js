const { showtimes, movies } = require("../models");

// Tạo lịch chiếu
const createMovieShowtime = async (req, res) => {
  const { maPhim, maLichChieu, ngayGioChieu } = req.body;
  try {
    const maPhimId = await movies.findOne({ where: { maPhim } });
    const newMovieShowtime = await showtimes.create({
      maLichChieu,
      ngayGioChieu,
    });
    res.status(201).send(newMovieShowtime);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { createMovieShowtime };

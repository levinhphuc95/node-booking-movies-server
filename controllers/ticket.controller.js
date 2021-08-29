const { showtimes, movies, cinemas, seats } = require("../models");
const { SeatData } = require("../seeder/SeatData");

// Tạo lịch chiếu
const createMovieShowtime = async (req, res) => {
  const { maPhim, maRap, giaVe, ngayGioChieu } = req.body;
  try {
    const { id: maPhimId } = await movies.findOne({ where: { maPhim } });
    const { id: maRapId } = await cinemas.findOne({ where: { maRap } });
    const maLichChieu = `${maRap}${maPhim}${parseInt(ngayGioChieu)}`;
    const newMovieShowtime = await showtimes.create({
      maLichChieu,
      ngayGioChieu,
      giaVe,
      MovieId: maPhimId,
      CinemaId: maRapId,
    });
    const seat = SeatData.map((item) => {
      const giaVeLocal = item.loaiGhe === "VIP" ? giaVe + 15000 : giaVe;
      const maGheLocal = `${newMovieShowtime.id}${item.tenGhe}`;
      return {
        ...item,
        maGhe: maGheLocal,
        giaVe: giaVeLocal,
        ShowtimeId: newMovieShowtime.id,
      };
    });
    await seats.bulkCreate(seat);
    res.status(201).send(newMovieShowtime);
  } catch (error) {
    res.status(500).send(error);
  }
};
// Lay Danh Sach Phong Ve
const layDanhSachPhongVe = async (req, res) => {
  const { maLichChieu } = req.query;
  try {
    const showtimeList = await showtimes.findOne({
      where: { maLichChieu },
      include: [{ model: movies }, { model: cinemas }],
    });
    const seatList = await seats.findAll({
      where: { ShowtimeId: showtimeList.id },
    });
    const { tenCumRap, maRap, tenRap, diaChi } = showtimeList.Cinema;
    const { tenPhim, hinhAnh } = showtimeList.Movie;
    const thongTinPhim = {
      maLichChieu,
      tenCumRap,
      tenRap,
      diaChi,
      tenPhim,
      hinhAnh,
      ngayGioChieu: showtimeList.ngayGioChieu,
    };
    const danhSachGhe = seatList.map((item) => {
      const { maGhe, tenGhe, loaiGhe, stt, giaVe, daDat, taiKhoanNguoiDat } =
        item;
      return {
        maGhe,
        tenGhe,
        maRap,
        loaiGhe,
        stt,
        giaVe,
        daDat,
        taiKhoanNguoiDat,
      };
    });
    res.status(201).send({ thongTinPhim, danhSachGhe });
  } catch (error) {
    res.status(500).send(error);
  }
};
// Dat Ve
const datVe = async (req, res) => {
  const { danhSachVe, taiKhoanNguoiDung } = req.body;

  try {
    const listMaGhe = danhSachVe.map((item) => item.maGhe);
    await seats.update(
      { daDat: true, taiKhoanNguoiDat: taiKhoanNguoiDung },
      { where: { maGhe: listMaGhe } }
    );
    res.status(200).send("Đặt vé thành công");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { createMovieShowtime, layDanhSachPhongVe, datVe };

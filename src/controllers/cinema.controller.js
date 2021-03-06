const { cineplexes, cinemas, showtimes, movies } = require("../models");

// Lấy danh sách hệ thống rạp
const getListCineplex = async (req, res) => {
  try {
    const cineplexList = await cineplexes.findAll();
    res.status(200).send(cineplexList);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Lấy danh sách cụm rạp theo hệ thống
const getListCinemaWithCineplex = async (req, res) => {
  const { maHeThongRap } = req.query;
  if (!maHeThongRap) {
    return res.status(400).send("Mã hệ thống rạp không tồn tại");
  }
  try {
    const { id: CineplexId } = await cineplexes.findOne({
      where: { maHeThongRap },
    });
    const cinemaList = await cinemas.findAll({
      where: { CineplexId },
    });
    const danhSachMaCumRap = [...new Set(cinemaList.map(item => item.maCumRap))];
    let bufferData = danhSachMaCumRap.map(item => {
      const {tenCumRap, diaChi} = cinemaList.find(cinema => cinema.maCumRap === item);
      return {maCumRap: item, tenCumRap, diaChi, danhSachRap: []}
    })
    for (let i = 0; i< cinemaList.length; i++) {
      const {maCumRap, maRap, tenRap} = cinemaList[i];
      const cumRapIndex = bufferData.findIndex(cinema => cinema.maCumRap === maCumRap);
      const cumRap = {...bufferData[cumRapIndex]};
      const danhSachRapLocal = cumRap.danhSachRap;
      const cumRapLocal = {...cumRap, danhSachRap: [...danhSachRapLocal, {maRap, tenRap }] }
      bufferData[cumRapIndex] = cumRapLocal
    }
    res.status(200).send(bufferData);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Thêm Cineplex
const createCineplex = async (req, res) => {
  const { maHeThongRap, tenHeThongRap, biDanh, logo } = req.body;
  try {
    const newCineplex = await cineplexes.create({
      maHeThongRap,
      tenHeThongRap,
      biDanh,
      logo,
    });
    res.status(201).send(newCineplex);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Thêm Cinema
const createCinena = async (req, res) => {
  const { maCumRap, tenCumRap, maRap, tenRap, diaChi, maHeThongRap } = req.body;
  try {
    const cineplex = await cineplexes.findOne({ where: { maHeThongRap } });
    const newCinema = await cinemas.create({
      maCumRap,
      tenCumRap,
      maRap,
      tenRap,
      diaChi,
      CineplexId: cineplex.id,
    });
    res.status(201).send(newCinema);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Lay Thong Tin Lich Chieu He Thong Rap
const layThongTinLichChieuHeThongRap = async (req, res) => {
  const { maHeThongRap } = req.query;
  try {
    const { id: CineplexId } = await cineplexes.findOne({
      where: { maHeThongRap },
    });
    const cinemaList = await cinemas.findAll({
      where: { CineplexId },
    });
    const cinemaListId = cinemaList.map((item) => item.id);
    const showtimeList = await showtimes.findAll({
      where: { CinemaId: cinemaListId },
    });
    const showtimeSchedule = showtimeList.map((item) => {
      const { maLichChieu, ngayGioChieu, giaVe } = item;
      const { maRap, tenRap } = cinemaList.find(
        (cinema) => cinema.id === item.CinemaId
      );
      return { maLichChieu, maRap, tenRap, ngayGioChieu, giaVe };
    });

    res.status(201).send(showtimeSchedule);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Lay Thong Tin Lich Chieu Phim
const layThongTinLichChieuPhim = async (req, res) => {
  const { maPhim } = req.query;
  try {
    const { id: MovieId } = await movies.findOne({
      where: { maPhim },
    });
    const showtimeList = await showtimes.findAll({
      where: { MovieId },
      include: { model: cinemas },
    });
    const showtimeSchedule = showtimeList.map((item) => {
      const { maLichChieu, ngayGioChieu, giaVe } = item;
      const { maRap, tenRap } = item.Cinema;
      return { maLichChieu, ngayGioChieu, giaVe, maRap, tenRap };
    });

    res.status(201).send(showtimeSchedule);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createCineplex,
  getListCineplex,
  getListCinemaWithCineplex,
  layThongTinLichChieuHeThongRap,
  layThongTinLichChieuPhim,
  createCinena,
};

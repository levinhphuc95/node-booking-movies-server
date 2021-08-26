const { cineplexes, cinemas } = require("../models");

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
    // const danhSachRapList = cinemaList.map((item) => {
    //     return { maRap: item.maRap, tenRap: item.tenRap }
    // });
    res.status(200).send(cinemaList);
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

module.exports = {
  createCineplex,
  getListCineplex,
  getListCinemaWithCineplex,
  createCinena,
};

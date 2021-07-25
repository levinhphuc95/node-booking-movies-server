module.exports = (sequelize, Sequelize) => {
  const Movie = sequelize.define("Movie", {
    maPhim: {
      type: Sequelize.INTEGER,
    },
    tenPhim: {
      type: Sequelize.STRING,
    },
    biDanh: {
      type: Sequelize.STRING,
    },
    trailer: {
      type: Sequelize.STRING,
    },
    hinhAnh: {
      type: Sequelize.STRING,
    },
    moTa: {
      type: Sequelize.STRING,
    },
    ngayKhoiChieu: {
      type: Sequelize.DATE,
    },
    danhGia: {
      type: Sequelize.INTEGER,
    },
  });

  return Movie;
};

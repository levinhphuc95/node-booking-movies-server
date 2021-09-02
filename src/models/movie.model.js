"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ cinemas }) {
      // define association here
      this.belongsToMany(cinemas, {
        as: "movie",
        through: "cinema_movie",
      });
    }
  }
  Movie.init(
    {
      maPhim: {
        type: DataTypes.INTEGER,
      },
      tenPhim: {
        type: DataTypes.STRING,
      },
      biDanh: {
        type: DataTypes.STRING,
      },
      trailer: {
        type: DataTypes.STRING,
      },
      hinhAnh: {
        type: DataTypes.STRING,
      },
      moTa: {
        type: DataTypes.STRING,
      },
      ngayKhoiChieu: {
        type: DataTypes.DATE,
      },
      danhGia: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};

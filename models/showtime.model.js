"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Showtime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ cinemas, movies }) {
      // define association here
      this.belongsTo(cinemas);
      this.belongsTo(movies);
    }
  }
  Showtime.init(
    {
      maLichChieu: {
        type: DataTypes.STRING,
      },
      ngayGioChieu: {
        type: DataTypes.DATE,
      },
      giaVe: {
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: "Showtime",
    }
  );
  return Showtime;
};

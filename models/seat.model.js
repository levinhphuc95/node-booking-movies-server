"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ showtimes }) {
      // define association here
      this.belongsTo(showtimes);
    }
  }
  Seat.init(
    {
      maGhe: {
        type: DataTypes.STRING,
      },
      tenGhe: {
        type: DataTypes.STRING,
      },
      loaiGhe: {
        type: DataTypes.STRING,
      },
      stt: {
        type: DataTypes.STRING,
      },
      giaVe: {
        type: DataTypes.INTEGER,
      },
      daDat: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Seat", // ticket
    }
  );
  return Seat;
};

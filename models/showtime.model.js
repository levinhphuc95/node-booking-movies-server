"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Showtime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ cinemas }) {
      // define association here
      this.belongsTo(cinemas, {
        foreignKey: "maRap",
      });
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
    },
    {
      sequelize,
      modelName: "Showtime",
    }
  );
  return Showtime;
};

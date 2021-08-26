"use strict";
const { Model } = require("sequelize");
const { cineplexes } = require(".");
module.exports = (sequelize, DataTypes) => {
  class Cinema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ movies , cineplexes }) {
      // define association here
      this.belongsToMany(movies, {
        as: "cinema",
        through: "cinema_movie",
      });

      this.belongsTo(cineplexes);
    }
  }
  Cinema.init(
    {
      maCumRap: {
        type: DataTypes.STRING, // BHD An-Duong-Vuong 
      },
      tenCumRap: {
        type: DataTypes.STRING, // BD An Duong Vuong
      },
      maRap: {
        type: DataTypes.INTEGER, // 512
      },
      tenRap: {
        type: DataTypes.STRING,
      },
      diaChi: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Cinema",
    }
  );
  return Cinema;
};

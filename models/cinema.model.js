"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cinema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Movie }) {
      // define association here
      this.belongsToMany(Movie, {
        as: "cinema",
        through: "cinema_movie",
      });
    }
  }
  Cinema.init(
    {
      maCumRap: {
        type: DataTypes.STRING,
      },
      tenCumRap: {
        type: DataTypes.STRING,
      },
      maRap: {
        type: DataTypes.INTEGER,
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

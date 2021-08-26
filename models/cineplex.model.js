"use strict";
const { Model } = require("sequelize");
const { cinemas } = require(".");
module.exports = (sequelize, DataTypes) => {
  class Cineplex extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ cinemas }) {
      // define association here
      this.hasMany(cinemas);
    }
  }
  Cineplex.init(
    {
      maHeThongRap: {
        type: DataTypes.STRING, // BHD
      },
      tenHeThongRap: {
        type: DataTypes.STRING, // BHD
      },
      biDanh: {
        type: DataTypes.STRING,
      },
      logo: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Cineplex",
    }
  );
  return Cineplex;
};

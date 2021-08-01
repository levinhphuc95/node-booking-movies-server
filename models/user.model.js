"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Seat }) {
      // define association here
      this.hasMany(Seat, {
        foreignKey: "taiKhoanNguoiDat",
      });
    }
  }
  User.init(
    {
      taiKhoan: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      hoTen: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      matKhau: {
        type: DataTypes.STRING,
      },
      soDt: {
        type: DataTypes.STRING,
      },
      maLoaiNguoiDung: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

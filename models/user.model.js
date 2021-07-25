module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    taiKhoan: {
      type: Sequelize.STRING,
    },
    hoTen: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    matKhau: {
      type: Sequelize.STRING,
    },
    soDt: {
      type: Sequelize.STRING,
    },
    maLoaiNguoiDung: {
      type: Sequelize.STRING,
    },
  });

  return User;
};

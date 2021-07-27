const { User, users } = require("../models");
const bcryptjs = require("bcryptjs");

const getListUser = async (req, res) => {
  try {
    const userList = await User.findAll();
    res.status(200).send(userList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createUser = async (req, res) => {
  const {taiKhoan, email, matKhau, hoTen, soDt, maLoaiNguoiDung } = req.body;
  try {
    // tạo chuổi ngẫu nhiêu
    const salt = bcryptjs.genSaltSync(10);
    // mã hóa password
    const hashPassword = bcryptjs.hashSync(matKhau, salt);
    const newUser = await users.create({
      taiKhoan,
      email,
      matKhau :hashPassword,
      hoTen,
      soDt,
      maLoaiNguoiDung,
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getListUser, createUser };

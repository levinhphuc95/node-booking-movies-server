require("dotenv").config();
const { users } = require("../models");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

// Lấy danh sách người dùng
const getListUser = async (req, res) => {
  try {
    const userList = await users.findAll();
    res.status(200).send(userList);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Đăng ký
const createUser = async (req, res) => {
  const { taiKhoan, email, matKhau, hoTen, soDt, maLoaiNguoiDung } = req.body;
  // Không được bỏ trống tài khoản hoặc mật khẩu
  if (!taiKhoan || !matKhau) {
    return res.status(400).send("Tài khoản/ Mật khẩu không được bỏ trống");
  }
  try {
    // kiểm tra xem người dùng đã tồn tại hay chưa
    const userCheck = await users.findOne({ where: { taiKhoan } });
    if (userCheck) {
      return res
        .status(400)
        .send("Tên tài khoản đã sử dụng, vui lòng nhập tên khác");
    }
    // tạo chuổi ngẫu nhiêu
    const salt = bcryptjs.genSaltSync(10);
    // mã hóa password
    const hashPassword = bcryptjs.hashSync(matKhau, salt);
    const newUser = await users.create({
      taiKhoan,
      email,
      matKhau: hashPassword,
      hoTen,
      soDt,
      maLoaiNguoiDung,
    });
    res.status(201).send("Tạo tài khoản thành công");
  } catch (error) {
    res.status(500).send(error);
  }
};

// Đăng nhập
const signIn = async (req, res) => {
  const { taiKhoan, matKhau } = req.body;
   // Không được bỏ trống tài khoản hoặc mật khẩu
  if (!taiKhoan || !matKhau) {
    return res.status(400).send("Tài khoản/ Mật khẩu không được bỏ trống");
  }
  try {
    const userLogin = await users.findOne({ where: { taiKhoan } });
    if (userLogin) {
      // so sánh password
      const isAuth = bcryptjs.compareSync(matKhau, userLogin.matKhau);
      if (isAuth) {
        // tạo token
        const payload = {
          id: userLogin.id,
          email: userLogin.email,
          maLoaiNguoiDung: userLogin.maLoaiNguoiDung,
        };

        const token = jwt.sign(payload, process.env.secretKey, {
          expiresIn: 12 * 30 * 24 * 60 * 60,
        });
        res.status(200).send({ massage: "Đăng Nhập Thành Công", token });
      } else {
        res.status(400).send("Tài khoản hoặc mật khẩu không đúng");
      }
    } else {
      res.status(400).send("Tài khoản hoặc mật khẩu không đúng");
    }
    res.send({ taiKhoan, matKhau });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getListUser, createUser, signIn };

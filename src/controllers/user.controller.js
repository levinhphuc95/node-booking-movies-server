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

// Lấy danh sách loại người dùng
const getListUserRole = async (req, res) => {
  const maLoaiNguoiDung = req.params.role;
  try {
    const userRole = await users.findAll({ where: { maLoaiNguoiDung } });
    res.status(200).send(userRole);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Lấy danh sách người dùng phân trang:
const getListUserPagination = async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.soTrang);
  const sizeAsNumber = Number.parseInt(req.query.soPhanTuTrenTrang);

  let soTrang = pageAsNumber;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    soTrang = pageAsNumber;
  }

  let soPhanTuTrenTrang = sizeAsNumber;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
    soPhanTuTrenTrang = sizeAsNumber;
  }
  try {
    const userListPagination = await users.findAndCountAll({
      limit: soPhanTuTrenTrang,
      offset: soTrang * soPhanTuTrenTrang,
    });
    res.status(200).send({
      currentPages: soTrang,
      count: soPhanTuTrenTrang,
      totalPages: Math.ceil(userListPagination.count / soPhanTuTrenTrang),
      totalCounts: userListPagination.count,
      items: userListPagination.rows,
    });
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
    newUser.save();
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
        res.status(200).send({ message: "Đăng Nhập Thành Công", token });
      } else {
        res.status(400).send("Tài khoản hoặc mật khẩu không đúng");
      }
    } else {
      res.status(400).send("Tài khoản hoặc mật khẩu không đúng");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Cập nhật thông tin người dùng
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { taiKhoan, email, matKhau, hoTen, soDt, maLoaiNguoiDung } = req.body;
  try {
    await users.update(
      { taiKhoan, email, matKhau, hoTen, soDt, maLoaiNguoiDung },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).send("Cập nhật thành công");
  } catch (error) {
    res.status(500).send(error);
  }
};

//Tìm kiếm người dùng
const getDetailUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userDetail = await users.findByPk(id);
    res.status(200).send(userDetail);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Xóa người dùng:
const removeUser = async (req, res) => {
  const { id } = req.params;
  // console.log(req.parmas)
  try {
    await users.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("Xóa người dùng thành công");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getListUser,
  createUser,
  signIn,
  updateUser,
  removeUser,
  getDetailUser,
  getListUserRole,
  getListUserPagination,
};

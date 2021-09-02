const express = require("express");
const {
  getListUser,
  createUser,
  signIn,
  updateUser,
  removeUser,
  getDetailUser,
  getListUserRole,
  getListUserPagination,
} = require("../controllers/user.controller");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");
const { logFeature } = require("../middlewares/log/log-feature.middlewares");
const {
  checkExist,
} = require("../middlewares/validations/check-exits.middlewares");
const { users } = require("../models");

const userRouter = express.Router();

userRouter.get(
  "/LayDanhSachNguoiDung",
  logFeature("lấy danh sách người dùng"),
  getListUser
);

userRouter.get(
  "/LayDanhSachNguoiDungPhanTrang",
  logFeature("lấy danh sách người dùng phân trang"),
  getListUserPagination
);

userRouter.get(
  "/LayDanhSachLoaiNguoiDung",
  logFeature("lấy danh sách loại người dùng"),
  getListUserRole
);

userRouter.get(
  "/TimKiemNguoiDung/:id",
  logFeature("lấy chi tiết người dùng"),
  checkExist(users),
  getDetailUser
);

userRouter.post("/DangKy", createUser);

userRouter.post("/DangNhap", signIn);

userRouter.post(
  "/ThemNguoiDung",
  authenticate,
  authorize(["QuanTri"]),
  createUser
);

userRouter.put(
  "/CapNhatThongTinNguoiDung/:id",
  authenticate,
  checkExist(users),
  updateUser
);

userRouter.delete(
  "/XoaNguoiDung/:id",
  authenticate,
  authorize(["QuanTri"]),
  checkExist(users),
  removeUser
);

module.exports = {
  userRouter,
};

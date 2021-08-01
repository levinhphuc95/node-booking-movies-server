require("dotenv").config();
const jwt = require("jsonwebtoken");
// kiểm tra người dùng đã đăng nhập hay chưa
const authenticate = (req, res, next) => {
  const token = req.header("token");
  try {
    const decode = jwt.verify(token, process.env.secretKey);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).send("Bạn Chưa Đăng Nhập");
  }
};

const authorize = (arrRole) => (req, res, next) => {
  const { user } = req;
  if (arrRole.findIndex((maLoaiNguoiDung) => user.maLoaiNguoiDung === maLoaiNguoiDung) > -1) {
    next();
  } else {
    res.status(403).send("Bạn Không Có Quyền");
  }
};

module.exports = {
  authenticate,
  authorize,
};

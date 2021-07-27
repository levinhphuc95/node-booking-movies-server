const { users } = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signIn = async (req, res) => {
  const { taiKhoan, matKhau } = req.body;
  /**
   * 2 bước đăng nhập :
   *  1/ tìm user theo email
   *  2/ so sánh password
   */
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
          role: userLogin.role,
        };
        const secretKey = "haoPN";
        const token = jwt.sign(payload, secretKey, {
          expiresIn: 12 * 30 * 24 * 60 * 60,
        });
        res.status(200).send({ massage: "Đăng Nhập Thành Công", token });
      } else {
        res.status(400).send("Sai Mật Khẩu");
      }
    } else {
      res.status(404).send("email không tồn tại");
    }
    res.send({ taiKhoan, matKhau });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  signIn,
};

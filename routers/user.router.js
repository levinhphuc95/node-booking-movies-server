const express = require("express");
const {
  getListUser,
  createUser,
  signIn,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/", getListUser);

userRouter.post("/DangKy", createUser);

userRouter.post("/DangNhap", signIn);

module.exports = {
  userRouter,
};

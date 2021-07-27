const express = require("express");
const { signIn } = require("../controllers/auth.controller");
const authRouter = express.Router();
authRouter.post("/danhNhap", signIn);
module.exports = { authRouter };

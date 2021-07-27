const express = require("express");
const { getListUser, createUser } = require("../controllers/user.controller");

const userRouter = express.Router();


userRouter.get("/", getListUser);

userRouter.post("/dangKy", createUser);



module.exports = {
  userRouter,
};

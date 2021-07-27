const express = require("express");
const rootRouter = express.Router();
const { ticketRouter } = require("./ticket.router");
const { userRouter } = require("./user.router");
const { movieRouter } = require("./movie.router");
const { cinemaRouter } = require("./cinema.router");
const { authRouter } = require("./auth.router");

rootRouter.use("/QuanLyDatVe", ticketRouter);
rootRouter.use("/QuanLyNguoiDung", userRouter);
rootRouter.use("/QuanLyPhim", movieRouter);
rootRouter.use("/QuanLyRap", cinemaRouter);
rootRouter.use("/", authRouter);

module.exports = {
  rootRouter,
};

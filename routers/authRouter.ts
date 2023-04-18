import express from "express";
const authRouter = express.Router();

import rateLimiter from "express-rate-limit";
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

import {
  sendEmail,
  register,
  login,
  updateUser,
} from "../controllers/authController";
import authenticateUser from "../middleware/auth";

authRouter.route("/sendEmail").post(apiLimiter, sendEmail);
authRouter.route("/register").post(apiLimiter, register);
authRouter.route("/login").post(apiLimiter, login);
authRouter.route("/updateUser").patch(authenticateUser, updateUser);

export default authRouter;

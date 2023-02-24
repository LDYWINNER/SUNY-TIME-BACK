import express from "express";
import { register, login, updateUser } from "../controllers/authController";
import authenticateUser from "../middleware/auth";

const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/updateUser").patch(authenticateUser, updateUser);

export default authRouter;

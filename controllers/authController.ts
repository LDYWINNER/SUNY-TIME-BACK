import { Request, Response } from "express";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";

const register = async (req: Request, res: Response) => {
  const { username, email, password, school, major } = req.body;
  if (!username || !email || !password || !school || !major) {
    throw new Error("Please check if you provided all values");
  }
  const user = await User.create({ username, email, password, school, major });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req: Request, res: Response) => {
  res.send("login user");
};

const updateUser = async (req: Request, res: Response) => {
  res.send("update user");
};

export { register, login, updateUser };

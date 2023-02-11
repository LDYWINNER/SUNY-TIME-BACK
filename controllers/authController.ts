import { Request, Response } from "express";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";

const register = async (req: Request, res: Response) => {
  const { username, email, password, school, major } = req.body;
  if (!username || !email || !password || !school || !major) {
    throw new BadRequestError("Please check if you provided all values");
  }
  //duplicate email checking
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  const user = await User.create({ username, email, password, school, major });
  user.createJWT();
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req: Request, res: Response) => {
  res.send("login user");
};

const updateUser = async (req: Request, res: Response) => {
  res.send("update user");
};

export { register, login, updateUser };

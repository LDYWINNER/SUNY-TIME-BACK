import { Request, Response } from "express";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";

class CustomAPIError extends Error {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

const register = async (req: Request, res: Response) => {
  const { username, email, password, school, major } = req.body;
  if (!username || !email || !password || !school || !major) {
    throw new CustomAPIError("Please check if you provided all values");
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

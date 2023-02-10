import { Request, Response } from "express";
import User from "../models/User";

const register = async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json({ user });
};

const login = async (req: Request, res: Response) => {
  res.send("login user");
};

const updateUser = async (req: Request, res: Response) => {
  res.send("update user");
};

export { register, login, updateUser };

import { Request, Response } from "express";

const register = async (req: Request, res: Response) => {
  res.send("register user");
};

const login = async (req: Request, res: Response) => {
  res.send("login user");
};

const updateUser = async (req: Request, res: Response) => {
  res.send("update user");
};

export { register, login, updateUser };

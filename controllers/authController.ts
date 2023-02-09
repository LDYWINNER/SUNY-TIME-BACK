import { Request, Response } from "express";

const register = (req: Request, res: Response) => {
  res.send("register user");
};

const login = (req: Request, res: Response) => {
  res.send("login user");
};

const updateUser = (req: Request, res: Response) => {
  res.send("update user");
};

export { register, login, updateUser };

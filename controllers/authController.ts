import { Request, Response } from "express";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";

const register = async (req: Request, res: Response) => {
  const { username, email, passwordRegister, school, major } = req.body;
  console.log(username);
  console.log(email);
  console.log(passwordRegister);
  console.log(school);
  console.log(major);

  if (!username || !email || !passwordRegister || !school || !major) {
    throw new BadRequestError("Please check if you provided all values");
  }
  //duplicate email checking
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  const user = await User.create({
    username,
    email,
    passwordRegister,
    school,
    major,
  });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      username: user.username,
      email: user.email,
      school: user.school,
      major: user.major,
    },
    token,
  });
};

const login = async (req: Request, res: Response) => {
  res.send("login user");
};

const updateUser = async (req: Request, res: Response) => {
  res.send("update user");
};

export { register, login, updateUser };

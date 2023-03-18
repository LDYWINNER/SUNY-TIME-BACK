import { Request, Response } from "express";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors";

const register = async (req: Request, res: Response) => {
  const { username, email, passwordRegister, school, major } = req.body;
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
  const { email, passwordLogin } = req.body;
  if (!email || !passwordLogin) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+passwordRegister");
  if (!user) {
    throw new UnAuthenticatedError("Login failed");
  }
  // console.log(user);

  const isPasswordCorrect = await user.comparePassword(passwordLogin);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Login failed");
  }
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      username: user.username,
      email: user.email,
      school: user.school,
      major: user.major,
      _id: user._id,
    },
    token,
  });
};

const updateUser = async (req: Request, res: Response) => {
  const { username, school, major } = req.body;
  if (!username || !school || !major) {
    throw new BadRequestError("Please check if you provided all values");
  }
  const user = await User.findOne({ _id: req.user?.userId });

  user!.username = username;
  user!.school = school;
  user!.major = major;

  await user?.save();

  const token = user?.createJWT();

  res.status(StatusCodes.OK).json({ user, token });
};

export { register, login, updateUser };

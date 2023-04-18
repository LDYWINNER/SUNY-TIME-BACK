import { Request, Response } from "express";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors";
import ejs from "ejs";
import nodemailer from "nodemailer";
import path from "path";

const appDir = path.dirname(require.main?.filename as string);

let emailConfirmationNum = 0;
let userData = {
  username: "",
  email: "",
  school: "",
  major: "",
};

const generateRandom = (min: number, max: number) => {
  const ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return ranNum;
};

const sendEmail = async (req: Request, res: Response) => {
  const { username, email, school, major } = req.body;
  if (!username || !email || !school || !major) {
    throw new BadRequestError("Please check if you provided all values");
  }
  //duplicate email checking
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  userData = {
    username,
    email,
    school,
    major,
  };

  let authNum = generateRandom(111111, 999999);
  let emailTemplete;
  ejs.renderFile(
    appDir + "/template/authMail.ejs",
    { authCode: authNum },
    function (err, data) {
      if (err) {
        console.log(err);
      }
      emailTemplete = data;
    }
  );

  let transporter = nodemailer.createTransport({
    service: "naver",
    host: "smtp.naver.com",
    port: 465,
    auth: {
      user: "sunytime-auth@naver.com",
      pass: "discomfort2306!",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = await transporter.sendMail({
    from: "sunytime-auth@naver.com",
    to: req.body.email,
    subject: "SUNYTIME Email Verfication",
    html: emailTemplete,
  });

  emailConfirmationNum = authNum;

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
    // console.log("Finish sending email : " + info.response);

    res.send({ emailConfirmationNum });
    transporter.close();
  });
};

const register = async (req: Request, res: Response) => {
  const { username, email, school, major } = userData;
  const user = await User.create({
    username,
    email,
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
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Please provide valid email");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnAuthenticatedError("Login failed");
  }
  // console.log(user);

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

export { sendEmail, register, login, updateUser };

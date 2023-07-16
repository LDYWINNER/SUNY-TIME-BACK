import { Request, Response } from "express";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors";
import ejs from "ejs";
import nodemailer from "nodemailer";
import path from "path";

const appDir = path.dirname(require.main?.filename as string);

let registerEmailConfirmationNum = 0;
let userData = {
  username: "",
  email: "",
  school: "",
  major: "",
};

let loginEmailConfirmationNum = 0;
let loginUserEmail = "";

const generateRandom = (min: number, max: number) => {
  const ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return ranNum;
};

const sendEmail = async (req: Request, res: Response) => {
  const { username, email, school, major } = req.body;
  if (!username || !email || school === "-1" || major === "-2") {
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
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = await transporter.sendMail({
    from: process.env.NODEMAILER_USER,
    to: req.body.email,
    subject: "SUNYTIME Register Email Verfication",
    html: emailTemplete,
  });

  registerEmailConfirmationNum = authNum;

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
    // console.log("Finish sending email : " + info.response);

    res.send({ registerEmailConfirmationNum });
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
    courseReviewNum: 0,
  });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      username: user.username,
      email: user.email,
      school: user.school,
      major: user.major,
      courseReviewNum: user.courseReviewNum,
    },
    token,
  });
};

const loginEmail = async (req: Request, res: Response) => {
  const { email }: { email: string } = req.body;
  const lowerCaseEmail = email.toLowerCase();

  if (!email) {
    throw new BadRequestError("Please provide valid email");
  }
  const user = await User.findOne({ email: lowerCaseEmail });
  if (!user) {
    throw new UnAuthenticatedError("Login failed");
  }
  // console.log(user);
  loginUserEmail = lowerCaseEmail;

  if (user.adminAccount) {
    return res.send({ authNum: -1, loginSkip: true });
  }

  //send email
  let authNum = generateRandom(1, 99);
  let emailTemplete;
  ejs.renderFile(
    appDir + "/template/loginMail.ejs",
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
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = await transporter.sendMail({
    from: process.env.NODEMAILER_USER,
    to: req.body.email,
    subject: "SUNYTIME Login Email Verfication",
    html: emailTemplete,
  });

  loginEmailConfirmationNum = authNum;

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
    // console.log("Finish sending email : " + info.response);

    res.send({ authNum: loginEmailConfirmationNum });
    transporter.close();
  });
};

const login = async (req: Request, res: Response) => {
  const email = loginUserEmail;
  console.log(email);
  console.log(loginUserEmail);

  const user = await User.findOne({ email });
  console.log(user);

  const token = user!.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      username: user!.username,
      email: user!.email,
      school: user!.school,
      major: user!.major,
      courseReviewNum: user!.courseReviewNum,
      _id: user!._id,
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

export { sendEmail, loginEmail, register, login, updateUser };

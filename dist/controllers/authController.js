"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.login = exports.register = exports.loginEmail = exports.sendEmail = void 0;
const User_1 = __importDefault(require("../models/User"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const ejs_1 = __importDefault(require("ejs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const appDir = path_1.default.dirname((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename);
let registerEmailConfirmationNum = 0;
let userData = {
    username: "",
    email: "",
    school: "",
    major: "",
};
let loginEmailConfirmationNum = 0;
let loginUserEmail = "";
const generateRandom = (min, max) => {
    const ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return ranNum;
};
const sendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, school, major } = req.body;
    if (!username || !email || school === "-1" || major === "-2") {
        throw new errors_1.BadRequestError("Please check if you provided all values");
    }
    //duplicate email checking
    const userAlreadyExists = yield User_1.default.findOne({ email });
    if (userAlreadyExists) {
        throw new errors_1.BadRequestError("Email already in use");
    }
    userData = {
        username,
        email,
        school,
        major,
    };
    let authNum = generateRandom(111111, 999999);
    let emailTemplete;
    ejs_1.default.renderFile(appDir + "/template/authMail.ejs", { authCode: authNum }, function (err, data) {
        if (err) {
            console.log(err);
        }
        emailTemplete = data;
    });
    let transporter = nodemailer_1.default.createTransport({
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
    let mailOptions = yield transporter.sendMail({
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
});
exports.sendEmail = sendEmail;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, school, major } = userData;
    const user = yield User_1.default.create({
        username,
        email,
        school,
        major,
        courseReviewNum: 0,
    });
    const token = user.createJWT();
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        user: {
            username: user.username,
            email: user.email,
            school: user.school,
            major: user.major,
            courseReviewNum: user.courseReviewNum,
        },
        token,
    });
});
exports.register = register;
const loginEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const lowerCaseEmail = email.toLowerCase();
    if (!email) {
        throw new errors_1.BadRequestError("Please provide valid email");
    }
    const user = yield User_1.default.findOne({ email: lowerCaseEmail });
    if (!user) {
        throw new errors_1.UnAuthenticatedError("Login failed");
    }
    // console.log(user);
    loginUserEmail = lowerCaseEmail;
    if (user.adminAccount) {
        return res.send({ authNum: -1, loginSkip: true });
    }
    //send email
    let authNum = generateRandom(1, 99);
    let emailTemplete;
    ejs_1.default.renderFile(appDir + "/template/loginMail.ejs", { authCode: authNum }, function (err, data) {
        if (err) {
            console.log(err);
        }
        emailTemplete = data;
    });
    let transporter = nodemailer_1.default.createTransport({
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
    let mailOptions = yield transporter.sendMail({
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
});
exports.loginEmail = loginEmail;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = loginUserEmail;
    console.log(email);
    console.log(loginUserEmail);
    const user = yield User_1.default.findOne({ email });
    console.log(user);
    const token = user.createJWT();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        user: {
            username: user.username,
            email: user.email,
            school: user.school,
            major: user.major,
            courseReviewNum: user.courseReviewNum,
            _id: user._id,
        },
        token,
    });
});
exports.login = login;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { username, school, major } = req.body;
    if (!username || !school || !major) {
        throw new errors_1.BadRequestError("Please check if you provided all values");
    }
    const user = yield User_1.default.findOne({ _id: (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId });
    user.username = username;
    user.school = school;
    user.major = major;
    yield (user === null || user === void 0 ? void 0 : user.save());
    const token = user === null || user === void 0 ? void 0 : user.createJWT();
    res.status(http_status_codes_1.StatusCodes.OK).json({ user, token });
});
exports.updateUser = updateUser;

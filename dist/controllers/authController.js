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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, school, major } = req.body;
    if (!username || !email || !password || !school || !major) {
        throw new errors_1.BadRequestError("Please check if you provided all values");
    }
    //duplicate email checking
    const userAlreadyExists = yield User_1.default.findOne({ email });
    if (userAlreadyExists) {
        throw new errors_1.BadRequestError("Email already in use");
    }
    const user = yield User_1.default.create({ username, email, password, school, major });
    const token = user.createJWT();
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        user: {
            username: user.username,
            email: user.email,
            school: user.school,
            major: user.major,
        },
        token,
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("login user");
});
exports.login = login;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("update user");
});
exports.updateUser = updateUser;

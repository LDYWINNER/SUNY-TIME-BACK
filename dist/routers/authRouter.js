"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many requests from this IP, please try again after 15 minutes",
});
const authController_1 = require("../controllers/authController");
const auth_1 = __importDefault(require("../middleware/auth"));
authRouter.route("/sendEmail").post(apiLimiter, authController_1.sendEmail);
authRouter.route("/loginEmail").post(apiLimiter, authController_1.loginEmail);
authRouter.route("/register").post(apiLimiter, authController_1.register);
authRouter.route("/login").post(apiLimiter, authController_1.login);
authRouter.route("/updateUser").patch(auth_1.default, authController_1.updateUser);
exports.default = authRouter;

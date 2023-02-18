"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
require("express-async-errors");
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const not_found_1 = __importDefault(require("./middleware/not-found"));
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const bulletinPostRouter_1 = __importDefault(require("./routers/bulletinPostRouter"));
const app = (0, express_1.default)();
const logger = (0, morgan_1.default)("dev");
//middlewares
if (process.env.NODE_ENV !== "production") {
    app.use(logger);
}
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//routers
app.use("/api/v1/auth", authRouter_1.default);
app.use("/api/v1/bulletin", bulletinPostRouter_1.default);
app.get("/", (req, res) => {
    res.send("welcome");
});
app.use(not_found_1.default);
app.use(error_handler_1.default);
exports.default = app;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, "Please provide name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
    },
    school: {
        type: String,
        required: [true, "Please provide your school info"],
    },
    major: {
        type: String,
        required: [true, "Please provide your major"],
    },
});
UserSchema.methods.createJWT = function () {
    return jsonwebtoken_1.default.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};
exports.default = (0, mongoose_1.model)("User", UserSchema);

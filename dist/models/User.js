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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
    passwordRegister: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 8,
        select: false,
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
UserSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        // const salt = await bcrypt.genSalt(10);
        // this.passwordRegister = await bcrypt.hash(this.passwordRegister, salt);
    });
});
UserSchema.methods.createJWT = function () {
    return jsonwebtoken_1.default.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};
UserSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isMatch = yield bcrypt_1.default.compare(candidatePassword, this.passwordRegister);
        return isMatch;
    });
};
exports.default = (0, mongoose_1.model)("User", UserSchema);

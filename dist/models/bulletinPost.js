"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BulletinPostSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Please provide title"],
        maxlength: 50,
    },
    content: {
        type: String,
        required: [true, "Please provide content"],
    },
    board: {
        type: String,
        default: "free",
        required: [true, "Please select a board"],
    },
    stars: {
        type: Number,
        default: 0,
    },
    createdBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("BulletinPost", BulletinPostSchema);

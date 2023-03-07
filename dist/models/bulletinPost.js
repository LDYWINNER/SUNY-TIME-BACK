"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BulletinPostComment = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: [true, "Please provide content"],
    },
    likes: {
        type: Number,
        required: true,
        default: 0,
    },
    dislikes: {
        type: Number,
        required: true,
        default: 0,
    },
    createdBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"],
    },
}, { timestamps: true });
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
    existingBoard: {
        type: String,
        default: "Free",
    },
    newBoard: {
        type: String,
        default: "",
    },
    anonymity: {
        type: Boolean,
        required: true,
        default: true,
    },
    likes: {
        type: Number,
        required: true,
        default: 0,
    },
    dislikes: {
        type: Number,
        required: true,
        default: 0,
    },
    comments: {
        type: [BulletinPostComment],
        required: true,
        default: [],
    },
    createdBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("BulletinPost", BulletinPostSchema);

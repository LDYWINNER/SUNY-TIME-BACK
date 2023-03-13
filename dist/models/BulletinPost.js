"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BulletinPostComment = new mongoose_1.Schema({
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
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"],
    },
}, { timestamps: true });
const BulletinPostSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"],
    },
    createdByUsername: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("BulletinPost", BulletinPostSchema);
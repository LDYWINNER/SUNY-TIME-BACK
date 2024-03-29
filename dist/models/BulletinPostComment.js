"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BulletinPostCommentSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: [true, "Please provide text"],
    },
    likes: {
        type: [String],
        required: true,
        default: [],
    },
    createdBy: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"],
    },
    bulletin: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "BulletinPost",
    },
    createdByUsername: {
        type: String,
        required: true,
    },
    anonymity: {
        type: Boolean,
        required: true,
        default: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("BulletinPostComment", BulletinPostCommentSchema);

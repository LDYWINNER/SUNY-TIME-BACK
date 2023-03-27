"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CourseReviewSchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Course",
    },
    semester: {
        type: String,
        required: [true, "Please provide which semester you took this course"],
    },
    homeworkQuantity: {
        type: String,
        enum: ["many", "soso", "few"],
        required: [true, "Please provide homework quantity"],
    },
    teamProjectPresence: {
        type: Boolean,
        required: [true, "Please provide team project presence"],
    },
    difficulty: {
        type: String,
        enum: ["difficult", "soso", "easy"],
    },
    testQuantity: {
        type: Number,
        required: [true, "Please provide test quantity"],
    },
    quizPresence: {
        type: Boolean,
        required: [true, "Please provide quiz presence"],
    },
    overallGrade: {
        type: Number,
        required: [true, "Please select overall grade of the course"],
    },
    overallEvaluation: {
        type: String,
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
    anonymity: {
        type: Boolean,
        required: true,
        default: true,
    },
    likes: {
        type: [String],
        required: true,
        default: [],
    },
});
exports.default = (0, mongoose_1.model)("CourseReview", CourseReviewSchema);

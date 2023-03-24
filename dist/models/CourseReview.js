"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const CourseReviewSchema = new mongoose_1.default.Schema({
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
        enum: [1, 2, 3, 4, 5],
        required: [true, "Please select overall grade of the course"],
    },
    overallEvaluation: {
        type: String,
    },
});
exports.default = mongoose_1.default.model("CourseReview", CourseReviewSchema);

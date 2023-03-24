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
exports.deleteReview = exports.likeReview = exports.createReview = exports.getSingleCourse = exports.likeCourse = exports.getAllCourses = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const Course_1 = __importDefault(require("../models/Course"));
const CourseReview_1 = __importDefault(require("../models/CourseReview"));
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("getAllCourses");
});
exports.getAllCourses = getAllCourses;
const likeCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("likeCourse");
});
exports.likeCourse = likeCourse;
const getSingleCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: courseId } = req.params;
    const course = yield Course_1.default.findOne({ _id: courseId });
    if (!course) {
        throw new errors_1.NotFoundError(`No course with id: ${courseId}`);
    }
    course.reviews = yield CourseReview_1.default.find({ course: courseId });
    res.status(http_status_codes_1.StatusCodes.OK).json({ course });
});
exports.getSingleCourse = getSingleCourse;
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("createReview");
});
exports.createReview = createReview;
const likeReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("likeReview");
});
exports.likeReview = likeReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("deleteReview");
});
exports.deleteReview = deleteReview;

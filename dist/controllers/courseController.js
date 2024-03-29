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
exports.updateUserCourseNum = exports.likeReview = exports.createReview = exports.getSingleCourse = exports.likeCourse = exports.getAllCourses = void 0;
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = __importDefault(require("mongoose"));
const errors_1 = require("../errors");
const Course_1 = __importDefault(require("../models/Course"));
const CourseReview_1 = __importDefault(require("../models/CourseReview"));
const User_1 = __importDefault(require("../models/User"));
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, subj } = req.query;
    let queryObject = {
        subj,
    };
    if (subj === "ACC/BUS") {
        queryObject = {
            $or: [{ subj: "ACC" }, { subj: "BUS" }],
        };
    }
    if (subj === "EST/EMP") {
        queryObject = {
            $or: [{ subj: "EST" }, { subj: "EMP" }],
        };
    }
    if (subj === "SHCourse") {
        queryObject = {
            $nor: [
                { subj: "AMS" },
                { subj: "ACC" },
                { subj: "BUS" },
                { subj: "CSE" },
                { subj: "ESE" },
                { subj: "EST" },
                { subj: "EMP" },
                { subj: "MEC" },
            ],
        };
    }
    if (search && subj !== "SHCourse") {
        if (subj === "ACC/BUS") {
            queryObject = {
                $and: [
                    {
                        $or: [
                            { crs: { $regex: search, $options: "i" } },
                            { courseTitle: { $regex: search, $options: "i" } },
                            { instructor_names: { $regex: search, $options: "i" } },
                        ],
                    },
                    { $or: [{ subj: "ACC" }, { subj: "BUS" }] },
                ],
            };
        }
        else if (subj === "EST/EMP") {
            queryObject = {
                $and: [
                    {
                        $or: [
                            { crs: { $regex: search, $options: "i" } },
                            { courseTitle: { $regex: search, $options: "i" } },
                            { instructor_names: { $regex: search, $options: "i" } },
                        ],
                    },
                    { $or: [{ subj: "EST" }, { subj: "EMP" }] },
                ],
            };
        }
        else {
            queryObject = {
                $and: [
                    {
                        $or: [
                            { crs: { $regex: search, $options: "i" } },
                            { courseTitle: { $regex: search, $options: "i" } },
                            { instructor_names: { $regex: search, $options: "i" } },
                        ],
                    },
                    { subj },
                ],
            };
        }
    }
    else if (search && subj === "SHCourse") {
        queryObject = {
            $and: [
                {
                    $or: [
                        { crs: { $regex: search, $options: "i" } },
                        { courseTitle: { $regex: search, $options: "i" } },
                        { instructor_names: { $regex: search, $options: "i" } },
                    ],
                },
                {
                    $nor: [
                        { subj: "AMS" },
                        { subj: "ACC" },
                        { subj: "BUS" },
                        { subj: "CSE" },
                        { subj: "ESE" },
                        { subj: "EST" },
                        { subj: "EMP" },
                        { subj: "MEC" },
                    ],
                },
            ],
        };
    }
    let result = Course_1.default.find(queryObject);
    if (subj === "SHCourse") {
        result = result.sort("subj");
    }
    else if (subj !== "ACC/BUS") {
        result = result.sort("crs");
    }
    //setup pagination
    const finalPage = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 16;
    const skip = (finalPage - 1) * limit;
    result = result.skip(skip).limit(limit);
    const allCourses = yield result;
    const totalCourses = yield Course_1.default.countDocuments(queryObject);
    const courseNumOfPages = Math.ceil(totalCourses / limit);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        allCourses,
        totalCourses,
        courseNumOfPages,
    });
});
exports.getAllCourses = getAllCourses;
const likeCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { id: courseId } = req.query;
    const course = yield Course_1.default.findOne({ _id: courseId });
    if (!course) {
        throw new errors_1.NotFoundError(`No course with id: ${courseId}`);
    }
    if (course.likes.includes((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId)) {
        const index = course.likes.indexOf((_b = req.user) === null || _b === void 0 ? void 0 : _b.userId);
        course.likes.splice(index, 1);
        const updatedCourse = yield Course_1.default.findOneAndUpdate({ _id: courseId }, { likes: course.likes });
        res.status(http_status_codes_1.StatusCodes.OK).json({ updatedCourse });
    }
    else {
        course.likes.push((_c = req.user) === null || _c === void 0 ? void 0 : _c.userId);
        const updatedCourse = yield Course_1.default.findOneAndUpdate({ _id: courseId }, { likes: course.likes });
        res.status(http_status_codes_1.StatusCodes.OK).json({ updatedCourse });
    }
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
    var _d, _e, _f;
    const { params: { id: courseId }, body: { semester, homeworkQuantity, teamProjectPresence, difficulty, testQuantity, quizPresence, overallGrade, instructor, }, } = req;
    const course = yield Course_1.default.findOne({ id: courseId });
    console.log(courseId);
    if (!course) {
        throw new errors_1.NotFoundError(`No course with id: ${courseId}`);
    }
    if (semester === "-1" ||
        !homeworkQuantity ||
        teamProjectPresence === null ||
        !difficulty ||
        testQuantity === null ||
        quizPresence === null ||
        !overallGrade ||
        instructor === "-2") {
        throw new errors_1.BadRequestError("Please provide all values");
    }
    var ObjectId = mongoose_1.default.Types.ObjectId;
    const alreadyCourse = yield CourseReview_1.default.findOne({
        createdBy: new ObjectId((_d = req.user) === null || _d === void 0 ? void 0 : _d.userId),
        course: new ObjectId(courseId),
    });
    if (alreadyCourse) {
        throw new errors_1.BadRequestError("You already submitted course review for this course :)");
    }
    req.body.createdBy = (_e = req.user) === null || _e === void 0 ? void 0 : _e.userId;
    req.body.course = courseId;
    const fetchUsername = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return User_1.default.findOne({ _id: userId }).then((user) => user === null || user === void 0 ? void 0 : user.username);
    });
    let username = yield fetchUsername((_f = req.user) === null || _f === void 0 ? void 0 : _f.userId);
    req.body.createdByUsername = username;
    const courseReview = yield CourseReview_1.default.create(req.body);
    course.reviews.push(courseReview._id);
    course.save();
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ courseReview });
});
exports.createReview = createReview;
const likeReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    const { reviewId } = req.params;
    const review = yield CourseReview_1.default.findOne({ _id: reviewId });
    if (!review) {
        throw new errors_1.NotFoundError(`No review with id: ${reviewId}`);
    }
    if (review.likes.includes((_g = req.user) === null || _g === void 0 ? void 0 : _g.userId)) {
        const index = review.likes.indexOf((_h = req.user) === null || _h === void 0 ? void 0 : _h.userId);
        review.likes.splice(index, 1);
        const updatedReview = yield CourseReview_1.default.findOneAndUpdate({ _id: reviewId }, { likes: review.likes });
        res.status(http_status_codes_1.StatusCodes.OK).json({ updatedReview });
    }
    else {
        review.likes.push((_j = req.user) === null || _j === void 0 ? void 0 : _j.userId);
        const updatedReview = yield CourseReview_1.default.findOneAndUpdate({ _id: reviewId }, { likes: review.likes });
        res.status(http_status_codes_1.StatusCodes.OK).json({ updatedReview });
    }
});
exports.likeReview = likeReview;
const updateUserCourseNum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    const user = yield User_1.default.findOne({ _id: (_k = req.user) === null || _k === void 0 ? void 0 : _k.userId });
    user.courseReviewNum++;
    yield (user === null || user === void 0 ? void 0 : user.save());
    const token = user === null || user === void 0 ? void 0 : user.createJWT();
    res.status(http_status_codes_1.StatusCodes.OK).json({ user, token });
});
exports.updateUserCourseNum = updateUserCourseNum;

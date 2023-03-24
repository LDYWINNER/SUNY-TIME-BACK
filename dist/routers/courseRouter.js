"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseController_1 = require("../controllers/courseController");
const courseRouter = express_1.default.Router();
courseRouter.route("/").get(courseController_1.getAllCourses).patch(courseController_1.likeCourse);
courseRouter.route("/:id").get(courseController_1.getSingleCourse).post(courseController_1.createReview);
courseRouter.route("/review/:reviewId").patch(courseController_1.likeReview).delete(courseController_1.deleteReview);
exports.default = courseRouter;

import express from "express";
import {
  getAllCourses,
  likeCourse,
  getSingleCourse,
  createReview,
  likeReview,
  updateUserCourseNum,
} from "../controllers/courseController";

const courseRouter = express.Router();

courseRouter.route("/").get(getAllCourses).patch(likeCourse);
courseRouter.route("/updateUserCourseNum").patch(updateUserCourseNum);
courseRouter.route("/:id").get(getSingleCourse).post(createReview);
courseRouter.route("/review/:reviewId").patch(likeReview);

export default courseRouter;

import express from "express";
import {
  getAllCourses,
  likeCourse,
  getSingleCourse,
  createReview,
  likeReview,
} from "../controllers/courseController";

const courseRouter = express.Router();

courseRouter.route("/").get(getAllCourses).patch(likeCourse);
courseRouter.route("/:id").get(getSingleCourse).post(createReview);
courseRouter.route("/review/:reviewId").patch(likeReview);

export default courseRouter;

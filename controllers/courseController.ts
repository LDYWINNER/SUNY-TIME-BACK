import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";
import Course from "../models/Course";
import CourseReview from "../models/CourseReview";

const getAllCourses = async (req: Request, res: Response) => {
  res.send("getAllCourses");
};

const likeCourse = async (req: Request, res: Response) => {
  res.send("likeCourse");
};

const getSingleCourse = async (req: Request, res: Response) => {
  const { id: courseId } = req.params;

  const course = await Course.findOne({ _id: courseId });

  if (!course) {
    throw new NotFoundError(`No course with id: ${courseId}`);
  }

  course.reviews = await CourseReview.find({ course: courseId });

  res.status(StatusCodes.OK).json({ course });
};

const createReview = async (req: Request, res: Response) => {
  res.send("createReview");
};

const likeReview = async (req: Request, res: Response) => {
  res.send("likeReview");
};

const deleteReview = async (req: Request, res: Response) => {
  res.send("deleteReview");
};

export {
  getAllCourses,
  likeCourse,
  getSingleCourse,
  createReview,
  likeReview,
  deleteReview,
};

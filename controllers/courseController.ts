import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import Course from "../models/Course";
import CourseReview from "../models/CourseReview";

const getAllCourses = async (req: Request, res: Response) => {
  res.send("getAllCourses");
};

const likeCourse = async (req: Request, res: Response) => {
  const { id: courseId } = req.query;

  const course = await Course.findOne({ classNbr: courseId });

  if (!course) {
    throw new NotFoundError(`No course with id: ${courseId}`);
  }

  if (course.likes.includes(req.user?.userId as string)) {
    const index = course.likes.indexOf(req.user?.userId as string);
    course.likes.splice(index, 1);
    const updatedCourse = await Course.findOneAndUpdate(
      { classNbr: courseId },
      { likes: course.likes }
    );
    res.status(StatusCodes.OK).json({ updatedCourse });
  } else {
    course.likes.push(req.user?.userId as string);
    const updatedCourse = await Course.findOneAndUpdate(
      { classNbr: courseId },
      { likes: course.likes }
    );
    res.status(StatusCodes.OK).json({ updatedCourse });
  }
};

const getSingleCourse = async (req: Request, res: Response) => {
  const { id: courseId } = req.params;

  const course = await Course.findOne({ classNbr: courseId });

  if (!course) {
    throw new NotFoundError(`No course with id: ${courseId}`);
  }

  course.reviews = await CourseReview.find({ course: courseId });

  res.status(StatusCodes.OK).json({ course });
};

const createReview = async (req: Request, res: Response) => {
  const {
    params: { id: courseId },
    body: {
      semester,
      homeworkQuantity,
      teamProjectPresence,
      difficulty,
      testQuantity,
      quizPresence,
      overallGrade,
    },
  } = req;

  const course = await Course.findOne({ classNbr: courseId });

  if (!course) {
    throw new NotFoundError(`No course with id: ${courseId}`);
  }

  if (
    !semester ||
    !homeworkQuantity ||
    !teamProjectPresence ||
    !difficulty ||
    !testQuantity ||
    !quizPresence ||
    !overallGrade
  ) {
    throw new BadRequestError("Please provide all values");
  }

  req.body.course = courseId;

  const courseReview = await CourseReview.create(req.body);
  course.reviews.push(courseReview._id);
  course.save();

  res.status(StatusCodes.CREATED).json({ courseReview });
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

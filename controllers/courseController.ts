import { Request, Response } from "express";

const getAllCourses = async (req: Request, res: Response) => {
  res.send("getAllCourses");
};

const likeCourse = async (req: Request, res: Response) => {
  res.send("likeCourse");
};

const getSingleCourse = async (req: Request, res: Response) => {
  res.send("getSingleCourse");
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

import { Request, Response } from "express";

const getAllCourses = async (req: Request, res: Response) => {
  res.send("getAllCourses");
};

const updateCourse = async (req: Request, res: Response) => {
  res.send("updateCourse");
};

export { getAllCourses, updateCourse };

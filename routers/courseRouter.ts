import express from "express";
import { getAllCourses, updateCourse } from "../controllers/courseController";

const bulletinPostRouter = express.Router();

bulletinPostRouter.route("/").get(getAllCourses);
bulletinPostRouter.route("/:id").patch(updateCourse);

export default bulletinPostRouter;

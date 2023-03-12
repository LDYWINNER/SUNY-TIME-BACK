import express from "express";
import {
  createBulletinPost,
  deleteBulletinPost,
  getAllBulletinPosts,
} from "../controllers/bulletinPostController";

const bulletinPostRouter = express.Router();

bulletinPostRouter.route("/").post(createBulletinPost).get(getAllBulletinPosts);
bulletinPostRouter.route("/:id").delete(deleteBulletinPost);

export default bulletinPostRouter;

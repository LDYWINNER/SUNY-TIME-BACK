import express from "express";
import {
  createBulletinPost,
  deleteBulletinPost,
  getAllBulletinPosts,
  getSinglePost,
  likeOrDislikeBulletinPost,
} from "../controllers/bulletinPostController";

const bulletinPostRouter = express.Router();

bulletinPostRouter
  .route("/")
  .post(createBulletinPost)
  .get(getAllBulletinPosts)
  .patch(likeOrDislikeBulletinPost);
bulletinPostRouter.route("/:id").delete(deleteBulletinPost).get(getSinglePost);

export default bulletinPostRouter;

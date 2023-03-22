import express from "express";
import {
  createBulletinPost,
  deleteBulletinPost,
  getAllBulletinPosts,
  getSinglePost,
  likeBulletinPost,
  createComment,
  likeComment,
  deleteComment,
} from "../controllers/bulletinPostController";

const bulletinPostRouter = express.Router();

bulletinPostRouter
  .route("/")
  .post(createBulletinPost)
  .get(getAllBulletinPosts)
  .patch(likeBulletinPost);
bulletinPostRouter
  .route("/:id")
  .delete(deleteBulletinPost)
  .get(getSinglePost)
  .post(createComment);
bulletinPostRouter
  .route("/comment/:commentId")
  .patch(likeComment)
  .delete(deleteComment);

export default bulletinPostRouter;

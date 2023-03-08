import { Request, Response } from "express";
import BulletinPost from "../models/BulletinPost";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors";

const createBulletinPost = async (req: Request, res: Response) => {
  const { title, content, existingBoard, newBoard, anonymity } = req.body;

  if (!title || !content || (!existingBoard && !newBoard)) {
    throw new BadRequestError("Please provide all values");
  }

  req.body.createdBy = req.user?.userId;
  const post = await BulletinPost.create(req.body);
  res.status(StatusCodes.CREATED).json({ post });
};

const getAllBulletinPosts = async (req: Request, res: Response) => {
  const allPosts = await BulletinPost.find();
  res
    .status(StatusCodes.OK)
    .json({ allPosts, totalPosts: allPosts.length, numOfPages: 1 });
};

const updateBulletinPost = async (req: Request, res: Response) => {
  res.send("updateBulletinPost");
};

const deleteBulletinPost = async (req: Request, res: Response) => {
  res.send("deleteBulletinPost");
};

const showStats = async (req: Request, res: Response) => {
  res.send("showStats");
};

export {
  createBulletinPost,
  deleteBulletinPost,
  getAllBulletinPosts,
  updateBulletinPost,
  showStats,
};

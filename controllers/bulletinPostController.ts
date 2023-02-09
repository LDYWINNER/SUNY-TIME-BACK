import { Request, Response } from "express";

const createBulletinPost = async (req: Request, res: Response) => {
  res.send("createBulletinPost");
};

const getAllBulletinPosts = async (req: Request, res: Response) => {
  res.send("getAllBulletinPosts");
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

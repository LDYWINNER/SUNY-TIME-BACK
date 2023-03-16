import { Request, Response } from "express";
import BulletinPost from "../models/BulletinPost";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import User from "../models/User";
import checkPermissions from "../utils/checkPermissions";

const createBulletinPost = async (req: Request, res: Response) => {
  const { title, content, board, anonymity } = req.body;

  if (!title || !content || board === "-1") {
    throw new BadRequestError("Please provide all values");
  }

  req.body.createdBy = req.user?.userId;
  req.body.anonymity = anonymity;

  const fetchUsername = async (userId: string) => {
    return User.findOne({ _id: userId }).then((user) => user?.username);
  };
  let username = await fetchUsername(req.user?.userId as string);
  req.body.createdByUsername = username;

  const post = await BulletinPost.create(req.body);
  res.status(StatusCodes.CREATED).json({ post });
};

interface IQueryObject {
  [x: string]: any;
  $and?: (
    | {
        $or: any;
      }
    | {
        board: any;
      }
  )[];
}
const getAllBulletinPosts = async (req: Request, res: Response) => {
  const { search, board } = req.query;

  let queryObject: IQueryObject = {
    board,
  };
  // content?: any; title?: any; board: any
  if (search) {
    queryObject = {
      $and: [
        {
          $or: [
            { content: { $regex: search, $options: "i" } },
            { title: { $regex: search, $options: "i" } },
          ],
        },
        { board },
      ],
    };
  }

  let result = BulletinPost.find(queryObject);

  //setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 7;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const bulletinAllPosts = await result;

  const bulletinTotalPosts = await BulletinPost.countDocuments(queryObject);
  const bulletinNumOfPages = Math.ceil(bulletinTotalPosts / limit);

  res.status(StatusCodes.OK).json({
    bulletinAllPosts,
    bulletinTotalPosts,
    bulletinNumOfPages,
  });
};

const deleteBulletinPost = async (req: Request, res: Response) => {
  const { id: postId } = req.params;

  const post = await BulletinPost.findOne({ _id: postId });

  if (!post) {
    throw new NotFoundError(`No post with id: ${postId}`);
  }

  checkPermissions(
    req.user as {
      userId: string;
    },
    post.createdBy
  );

  await post.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Post removed" });
};

export { createBulletinPost, deleteBulletinPost, getAllBulletinPosts };

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
  const finalPage = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 7;
  const skip = (finalPage - 1) * limit;

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

const getSinglePost = async (req: Request, res: Response) => {
  const { id: postId } = req.params;

  const post = await BulletinPost.findOne({ _id: postId });

  if (!post) {
    throw new NotFoundError(`No post with id: ${postId}`);
  }

  res.status(StatusCodes.OK).json({ post });
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

const likeBulletinPost = async (req: Request, res: Response) => {
  const { id: postId, like } = req.query;
  console.log(postId, like);

  const post = await BulletinPost.findOne({ _id: postId });

  if (!post) {
    throw new NotFoundError(`No post with id: ${postId}`);
  }

  if (like) {
    if (post.likes.includes(req.user?.userId as string)) {
      const index = post.likes.indexOf(req.user?.userId as string);
      post.likes.splice(index, 1);
      const updatedPost = await BulletinPost.findOneAndUpdate(
        { _id: postId },
        { likes: post.likes }
      );
      res.status(StatusCodes.OK).json({ updatedPost });
    } else {
      post.likes.push(req.user?.userId as string);
      const updatedPost = await BulletinPost.findOneAndUpdate(
        { _id: postId },
        { likes: post.likes }
      );
      res.status(StatusCodes.OK).json({ updatedPost });
    }
  }
};

export {
  createBulletinPost,
  deleteBulletinPost,
  getAllBulletinPosts,
  getSinglePost,
  likeBulletinPost,
};

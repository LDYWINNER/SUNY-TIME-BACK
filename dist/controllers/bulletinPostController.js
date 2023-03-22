"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.likeComment = exports.createComment = exports.likeBulletinPost = exports.getSinglePost = exports.getAllBulletinPosts = exports.deleteBulletinPost = exports.createBulletinPost = void 0;
const BulletinPost_1 = __importDefault(require("../models/BulletinPost"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const User_1 = __importDefault(require("../models/User"));
const checkPermissions_1 = __importDefault(require("../utils/checkPermissions"));
const BulletinPostComment_1 = __importDefault(require("../models/BulletinPostComment"));
const createBulletinPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { title, content, board, anonymity } = req.body;
    if (!title || !content || board === "-1") {
        throw new errors_1.BadRequestError("Please provide all values");
    }
    req.body.createdBy = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    req.body.anonymity = anonymity;
    const fetchUsername = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return User_1.default.findOne({ _id: userId }).then((user) => user === null || user === void 0 ? void 0 : user.username);
    });
    let username = yield fetchUsername((_b = req.user) === null || _b === void 0 ? void 0 : _b.userId);
    req.body.createdByUsername = username;
    const post = yield BulletinPost_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ post });
});
exports.createBulletinPost = createBulletinPost;
const getAllBulletinPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, board } = req.query;
    let queryObject = {
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
    let result = BulletinPost_1.default.find(queryObject);
    result = result.sort("-createdAt");
    //setup pagination
    const finalPage = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 7;
    const skip = (finalPage - 1) * limit;
    result = result.skip(skip).limit(limit);
    const bulletinAllPosts = yield result;
    const bulletinTotalPosts = yield BulletinPost_1.default.countDocuments(queryObject);
    const bulletinNumOfPages = Math.ceil(bulletinTotalPosts / limit);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        bulletinAllPosts,
        bulletinTotalPosts,
        bulletinNumOfPages,
    });
});
exports.getAllBulletinPosts = getAllBulletinPosts;
const getSinglePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: postId } = req.params;
    const post = yield BulletinPost_1.default.findOne({ _id: postId });
    if (!post) {
        throw new errors_1.NotFoundError(`No post with id: ${postId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ post });
});
exports.getSinglePost = getSinglePost;
const deleteBulletinPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: postId } = req.params;
    const post = yield BulletinPost_1.default.findOne({ _id: postId });
    if (!post) {
        throw new errors_1.NotFoundError(`No post with id: ${postId}`);
    }
    (0, checkPermissions_1.default)(req.user, post.createdBy);
    yield post.remove();
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Success! Post removed" });
});
exports.deleteBulletinPost = deleteBulletinPost;
const likeBulletinPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    const { id: postId, like } = req.query;
    console.log(postId, like);
    const post = yield BulletinPost_1.default.findOne({ _id: postId });
    if (!post) {
        throw new errors_1.NotFoundError(`No post with id: ${postId}`);
    }
    if (like) {
        if (post.likes.includes((_c = req.user) === null || _c === void 0 ? void 0 : _c.userId)) {
            const index = post.likes.indexOf((_d = req.user) === null || _d === void 0 ? void 0 : _d.userId);
            post.likes.splice(index, 1);
            const updatedPost = yield BulletinPost_1.default.findOneAndUpdate({ _id: postId }, { likes: post.likes });
            res.status(http_status_codes_1.StatusCodes.OK).json({ updatedPost });
        }
        else {
            post.likes.push((_e = req.user) === null || _e === void 0 ? void 0 : _e.userId);
            const updatedPost = yield BulletinPost_1.default.findOneAndUpdate({ _id: postId }, { likes: post.likes });
            res.status(http_status_codes_1.StatusCodes.OK).json({ updatedPost });
        }
    }
});
exports.likeBulletinPost = likeBulletinPost;
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const { query: { id: postId }, body: { text }, } = req;
    const bulletinPost = yield BulletinPost_1.default.findById(postId);
    if (!bulletinPost) {
        throw new errors_1.NotFoundError(`No post with id: ${postId}`);
    }
    if (!text) {
        throw new errors_1.BadRequestError("Please provide all values");
    }
    req.body.createdBy = (_f = req.user) === null || _f === void 0 ? void 0 : _f.userId;
    req.body.bulletin = postId;
    const comment = yield BulletinPostComment_1.default.create(req.body);
    bulletinPost.comments.push(comment._id);
    bulletinPost.save();
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ comment });
});
exports.createComment = createComment;
const likeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    const { id: commentId } = req.query;
    const comment = yield BulletinPostComment_1.default.findOne({ _id: commentId });
    if (!comment) {
        throw new errors_1.NotFoundError(`No Comment with id: ${commentId}`);
    }
    if (comment.likes.includes((_g = req.user) === null || _g === void 0 ? void 0 : _g.userId)) {
        const index = comment.likes.indexOf((_h = req.user) === null || _h === void 0 ? void 0 : _h.userId);
        comment.likes.splice(index, 1);
        const updatedComment = yield BulletinPostComment_1.default.findOneAndUpdate({ _id: commentId }, { likes: comment.likes });
        res.status(http_status_codes_1.StatusCodes.OK).json({ updatedComment });
    }
    else {
        comment.likes.push((_j = req.user) === null || _j === void 0 ? void 0 : _j.userId);
        const updatedComment = yield BulletinPostComment_1.default.findOneAndUpdate({ _id: commentId }, { likes: comment.likes });
        res.status(http_status_codes_1.StatusCodes.OK).json({ updatedComment });
    }
});
exports.likeComment = likeComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    const comment = yield BulletinPostComment_1.default.findOne({ _id: commentId });
    if (!comment) {
        throw new errors_1.NotFoundError(`No post with id: ${commentId}`);
    }
    (0, checkPermissions_1.default)(req.user, comment.createdBy);
    yield comment.remove();
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Comment removed successfully" });
});
exports.deleteComment = deleteComment;

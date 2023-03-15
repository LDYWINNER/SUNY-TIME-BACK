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
exports.getAllBulletinPosts = exports.deleteBulletinPost = exports.createBulletinPost = void 0;
const BulletinPost_1 = __importDefault(require("../models/BulletinPost"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const User_1 = __importDefault(require("../models/User"));
const checkPermissions_1 = __importDefault(require("../utils/checkPermissions"));
const createBulletinPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { title, content, board, anonymity } = req.body;
    if (!title || !content || !board) {
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
    const bulletinAllPosts = yield result;
    res.status(http_status_codes_1.StatusCodes.OK).json({
        bulletinAllPosts,
        bulletinTotalPosts: bulletinAllPosts.length,
        bulletinNumOfPages: 1,
    });
});
exports.getAllBulletinPosts = getAllBulletinPosts;
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

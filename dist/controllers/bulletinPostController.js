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
exports.showStats = exports.updateBulletinPost = exports.getAllBulletinPosts = exports.deleteBulletinPost = exports.createBulletinPost = void 0;
const BulletinPost_1 = __importDefault(require("../models/BulletinPost"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const createBulletinPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, content, board, anonymity } = req.body;
    if (!title || !content || !board || !anonymity) {
        throw new errors_1.BadRequestError("Please provide all values");
    }
    req.body.createdBy = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const post = yield BulletinPost_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ post });
});
exports.createBulletinPost = createBulletinPost;
const getAllBulletinPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("getAllBulletinPosts");
});
exports.getAllBulletinPosts = getAllBulletinPosts;
const updateBulletinPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("updateBulletinPost");
});
exports.updateBulletinPost = updateBulletinPost;
const deleteBulletinPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("deleteBulletinPost");
});
exports.deleteBulletinPost = deleteBulletinPost;
const showStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("showStats");
});
exports.showStats = showStats;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bulletinPostController_1 = require("../controllers/bulletinPostController");
const bulletinPostRouter = express_1.default.Router();
bulletinPostRouter
    .route("/")
    .post(bulletinPostController_1.createBulletinPost)
    .get(bulletinPostController_1.getAllBulletinPosts)
    .patch(bulletinPostController_1.likeBulletinPost);
bulletinPostRouter
    .route("/:id")
    .delete(bulletinPostController_1.deleteBulletinPost)
    .get(bulletinPostController_1.getSinglePost)
    .post(bulletinPostController_1.createComment);
bulletinPostRouter
    .route("/:commentId")
    .patch(bulletinPostController_1.likeComment)
    .delete(bulletinPostController_1.deleteComment);
exports.default = bulletinPostRouter;

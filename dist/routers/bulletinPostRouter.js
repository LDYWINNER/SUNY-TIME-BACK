"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bulletinPostController_1 = require("../controllers/bulletinPostController");
const bulletinPostRouter = express_1.default.Router();
bulletinPostRouter.route("/").post(bulletinPostController_1.createBulletinPost).get(bulletinPostController_1.getAllBulletinPosts);
bulletinPostRouter.route("/stats").get(bulletinPostController_1.showStats);
bulletinPostRouter
    .route("/:id")
    .delete(bulletinPostController_1.deleteBulletinPost)
    .patch(bulletinPostController_1.updateBulletinPost);
exports.default = bulletinPostRouter;
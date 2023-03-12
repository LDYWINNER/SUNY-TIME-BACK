"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseController_1 = require("../controllers/courseController");
const bulletinPostRouter = express_1.default.Router();
bulletinPostRouter.route("/").get(courseController_1.getAllCourses);
bulletinPostRouter.route("/:id").patch(courseController_1.updateCourse);
exports.default = bulletinPostRouter;

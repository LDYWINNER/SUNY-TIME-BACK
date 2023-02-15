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
Object.defineProperty(exports, "__esModule", { value: true });
exports.showStats = exports.updateBulletinPost = exports.getAllBulletinPosts = exports.deleteBulletinPost = exports.createBulletinPost = void 0;
const createBulletinPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("createBulletinPost");
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

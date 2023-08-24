"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDoState = exports.currentCourseState = exports.courseReviewsState = exports.loginConfirmationState = exports.emailConfirmationState = exports.courseReviewResultState = exports.courseReviewInstructorState = exports.courseSearchState = exports.bulletinSearchState = exports.singlePageBgImageState = exports.globalCurrentState = exports.isDarkAtom = void 0;
const recoil_1 = require("recoil");
const recoil_persist_1 = require("recoil-persist");
const { persistAtom } = (0, recoil_persist_1.recoilPersist)();
const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
exports.isDarkAtom = (0, recoil_1.atom)({
    key: "isDark",
    default: false,
    effects_UNSTABLE: [persistAtom],
});
exports.globalCurrentState = (0, recoil_1.atom)({
    key: "initialState",
    default: {
        user: user ? JSON.parse(user) : null,
        token: token,
        bulletinAllPosts: [],
        bulletinTotalPosts: 0,
        bulletinNumOfPages: 1,
        bulletinPage: 1,
        allCourses: [],
        totalCourses: 0,
        courseNumOfPages: 1,
        coursePage: 1,
    },
});
exports.singlePageBgImageState = (0, recoil_1.atom)({
    key: "singlePageBgImage",
    default: "",
});
exports.bulletinSearchState = (0, recoil_1.atom)({
    key: "bulletinSearch",
    default: {
        searchKeyword: "",
        boardFilter: "Free",
    },
});
exports.courseSearchState = (0, recoil_1.atom)({
    key: "courseSearch",
    default: {
        searchKeyword: "",
        courseSubjFilter: "AMS",
    },
});
exports.courseReviewInstructorState = (0, recoil_1.atom)({
    key: "courseReviewInstructor",
    default: {
        instructorNum: 0,
        instructorName: ["", ""],
    },
});
exports.courseReviewResultState = (0, recoil_1.atom)({
    key: "courseReviewResult",
    default: {
        stars: 0,
        homeworkQuantity: [0, 0, 0],
        difficulty: [0, 0, 0],
        testQuantity: [0, 0, 0, 0],
        teamProjectPresence: [0, 0],
        quizPresence: [0, 0],
    },
});
exports.emailConfirmationState = (0, recoil_1.atom)({
    key: "emailConfirmation",
    default: {
        authNum: 0,
    },
});
exports.loginConfirmationState = (0, recoil_1.atom)({
    key: "loginConfirmation",
    default: {
        authNum: 0,
    },
});
exports.courseReviewsState = (0, recoil_1.atom)({
    key: "courseReviews",
    default: [],
});
exports.currentCourseState = (0, recoil_1.atom)({
    key: "currentCourse",
    default: {
        subj: "",
        crs: "",
    },
});
exports.toDoState = (0, recoil_1.atom)({
    key: "toDo",
    default: {},
    effects_UNSTABLE: [persistAtom],
});

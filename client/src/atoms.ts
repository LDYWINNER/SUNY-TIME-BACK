import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const globalCurrentState = atom({
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

export const singlePageBgImageState = atom({
  key: "singlePageBgImage",
  default: "",
});

export const bulletinSearchState = atom({
  key: "bulletinSearch",
  default: {
    searchKeyword: "",
    boardFilter: "Free",
  },
});

export const courseSearchState = atom({
  key: "courseSearch",
  default: {
    searchKeyword: "",
    courseSubjFilter: "AMS",
  },
});

export const courseReviewInstructorState = atom({
  key: "courseReviewInstructor",
  default: {
    instructorNum: 0,
    instructorName: ["", ""],
  },
});

export const courseReviewResultState = atom({
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

export const emailConfirmationState = atom({
  key: "emailConfirmation",
  default: {
    authNum: 0,
  },
});

export const loginConfirmationState = atom({
  key: "loginConfirmation",
  default: {
    authNum: 0,
  },
});

interface ICourseReview {
  course: string;
  semester: string;
  instructor: string;
  myLetterGrade: string;
  homeworkQuantity: string;
  teamProjectPresence: boolean;
  difficulty: string;
  testQuantity: number;
  quizPresence: boolean;
  overallGrade: number;
  overallEvaluation: string;
  createdBy: string;
  createdByUsername: string;
  anonymity: boolean;
  likes: [string];
  _id: string;
  createdAt: string;
}

export const courseReviewsState = atom<ICourseReview[]>({
  key: "courseReviews",
  default: [],
});

export const currentCourseState = atom({
  key: "currentCourse",
  default: {
    subj: "",
    crs: "",
  },
});

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

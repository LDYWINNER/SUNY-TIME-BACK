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

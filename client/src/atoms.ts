import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
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

export const bulletinBgImageState = atom({
  key: "bulletinBgImage",
  default: "",
});

export const bulletinSearchState = atom({
  key: "bulletinSearch",
  default: {
    searchKeyword: "",
    boardFilter: "Free",
  },
});

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
    //for the features
    isEditing: false,
    editPostId: "",
    postTitle: "",
    postContent: "",
    postBoard: "",
    bulletinBoardOptions: ["free"],
    bulletinBoardType: "free",
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

import { atom } from "recoil";

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
  },
});

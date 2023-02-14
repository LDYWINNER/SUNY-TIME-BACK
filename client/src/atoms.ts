import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export const globalCurrentState = atom({
  key: "initialState",
  default: {
    user: null,
    token: null,
  },
});

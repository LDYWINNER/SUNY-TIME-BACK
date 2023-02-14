import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export const globalCurrentState = atom({
  key: "initialState",
  default: {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    user: null,
    token: null,
    userLocation: "",
  },
});

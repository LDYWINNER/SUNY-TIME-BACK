export const startInterval = (seconds: number, callback: () => void) => {
  callback();
  return setInterval(callback, seconds * 1000);
};

interface IUserToken {
  user: {
    username: string;
    email: string;
    school: string;
    major: string;
    passwordRegister: string;
  };
  token: string;
}

export const addUserToLocalStorage = ({ user, token }: IUserToken) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

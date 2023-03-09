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

// interface IPostComment {
//   content: string;
//   likes: number;
//   dislikes: number;
//   createdBy: string;
//   updatedAt: string;
// }

// interface IPost {
//   comments: [IPostComment];
//   anonymity: Boolean;
//   board: string;
//   content: string;
//   createdAt: string;
//   createdBy: string;
//   dislikes: number;
//   existingBoard: string;
//   likes: number;
//   newBoard: string;
//   title: string;
//   updatedAt: string;
//   __v: number;
//   _id: string;
// }

// interface IPosts {
//   bulletinAllPosts: [IPost];
//   bulletinNumOfPages: number;
//   bulletinTotalPosts: number;
// }

export const addUserToLocalStorage = ({ user, token }: IUserToken) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

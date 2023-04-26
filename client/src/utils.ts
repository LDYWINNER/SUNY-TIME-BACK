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

export const amsInstructors = [
  "Kazem Mahdavi",
  "Young-seon Lee",
  "Ky Tran",
  "Tan Cao",
  "Suil O",
  "CHANGSOON PARK",
  "Hongshik Ahn",
  "Hyunwook Koh",
];

export const accbusInstructors = [
  "Jaeyeong Lee",
  "Chungseung Lee",
  "Noelle (Myunghun) Chung",
  "Chih-mao Hsieh",
  "Joung Hwa Choi",
  "Sung Sup Choi",
  "Dae Ryun Chang",
  "KYUNG KU KIM",
  "In Ki Joo",
  "Young-Won Ha",

  "Soo Young Kwon",
  "Jeehong Kim",
  "Sunghee Kim",
];

export const cseInstructors = [
  "Francois Rameau",
  "Antonino Mione",
  "Byungkon Kang",
  "Zhoulai Fu",
  "Amos Omondi",
  "Jihoon Ryoo",
  "Arthur Lee",
  "Seung Soo Park",
  "Chi Him Wong",
];

export const eseInstructors = ["Sangjin Hong", "Cornelius Bradter"];

export const estempInstructors = [
  "Maurice Bess",
  "Joseph Cabuay",
  "Anthony Pennings",
  "James Larson",
  "Neal Dreamson",
  "Cornelius Bradter",
  "Su Hyeong Kim",
  "Suzana Brown",
  "Gayoung Park",
  "Jang Lee",
  "Sira Maliphol",
  "Jin-sang Lee",
  "Mark Whitaker",
  "Young-Geun Lee",
  "Johng-Ihl Lee",
  "Gerald Stokes",

  "Sung Jin Kim",
];

export const mecInstructors = [
  "Cornelius Bradter",
  "Jong Park",
  "Hamid Hefazi",
  "Gun Woong Bahng",
  "Changwoon Han",
  "JONGSEONG CHOI",
  "Y Pak",
  "Seung Bok Choi",
  "Min Yang Yang",
  "Joon Sik Lee",
];

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mecInstructors = exports.estempInstructors = exports.eseInstructors = exports.cseInstructors = exports.accbusInstructors = exports.amsInstructors = exports.removeUserFromLocalStorage = exports.addUserToLocalStorage = exports.startInterval = void 0;
const startInterval = (seconds, callback) => {
    callback();
    return setInterval(callback, seconds * 1000);
};
exports.startInterval = startInterval;
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
const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
};
exports.addUserToLocalStorage = addUserToLocalStorage;
const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};
exports.removeUserFromLocalStorage = removeUserFromLocalStorage;
exports.amsInstructors = [
    "Kazem Mahdavi",
    "Young-seon Lee",
    "Ky Tran",
    "Tan Cao",
    "Suil O",
    "CHANGSOON PARK",
    "Hongshik Ahn",
    "Hyunwook Koh",
];
exports.accbusInstructors = [
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
exports.cseInstructors = [
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
exports.eseInstructors = ["Sangjin Hong", "Cornelius Bradter"];
exports.estempInstructors = [
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
exports.mecInstructors = [
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

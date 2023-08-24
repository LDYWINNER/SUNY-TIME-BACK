"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WoolfieIcon = exports.ClassieBtn = exports.Likes = exports.Title = exports.Info = exports.Main = exports.Container = exports.Wrapper = exports.LoadingWrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.LoadingWrapper = styled_components_1.default.div `
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
exports.Wrapper = styled_components_1.default.section `
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;
exports.Container = styled_components_1.default.div `
  z-index: 0;
  width: 70%;
  height: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.bgColor.lighter};
  color: ${(props) => props.theme.textColor.darker};
  padding: 15px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;
exports.Main = styled_components_1.default.div `
  padding: 0.5rem 3rem;
`;
exports.Info = styled_components_1.default.div `
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;
exports.Title = styled_components_1.default.span `
  font-size: 50px;
  font-weight: 600;
  color: ${(props) => props.theme.main.blue};
  font-family: "Bebas Neue", cursive;
  display: block;
  margin-bottom: 1rem;
`;
exports.Likes = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 30px;
  h4 {
    margin-left: 5px;
  }
  div {
    display: flex;
    justify-content: flex-end;
  }
`;
exports.ClassieBtn = styled_components_1.default.button `
  background-color: ${(props) => props.theme.main.darkred};
  color: ${(props) => props.theme.textColor};
  display: flex;
  &:hover {
    background-color: ${(props) => props.theme.main.red};
  }
  width: 15rem;
  font-weight: 600;
  font-size: 18px;
  align-items: center;
`;
exports.WoolfieIcon = styled_components_1.default.img `
  width: 20%;
  margin-left: -5px;
  margin-right: 5px;
`;

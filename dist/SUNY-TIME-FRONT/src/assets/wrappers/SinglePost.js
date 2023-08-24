"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = exports.Col = exports.PostContent = exports.IconRow = exports.Row = exports.Title = exports.TitleRow = exports.Main = exports.Container = exports.Wrapper = exports.LoadingWrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.LoadingWrapper = styled_components_1.default.div `
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
exports.Wrapper = styled_components_1.default.section `
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;
exports.Container = styled_components_1.default.div `
  margin-top: 100px;
  z-index: 0;
  width: 70%;
  height: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.bgColor.lighter};
  color: ${(props) => props.theme.textColor.darker};
  padding: 15px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  h1 {
    font-weight: 600;
    font-size: 3rem;
  }
`;
exports.Main = styled_components_1.default.div `
  padding: 0.5rem 3rem;
`;
exports.TitleRow = styled_components_1.default.div `
  margin-top: 2rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.textColor.darker};
  button {
    background-color: ${(props) => props.theme.main.blue};
  }
`;
exports.Title = styled_components_1.default.span `
  font-size: 5vh;
  font-weight: 600;
  color: ${(props) => props.theme.main.blue};
  font-family: "Bebas Neue", cursive;
`;
exports.Row = styled_components_1.default.div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;
exports.IconRow = styled_components_1.default.div `
  display: flex;
  align-items: center;
  justify-content: flex-end;
  h4 {
    margin-left: 0.5rem;
  }
`;
exports.PostContent = styled_components_1.default.div `
  margin-bottom: 2rem;
`;
exports.Col = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .time {
    color: ${(props) => props.theme.textColor.darker};
    font-size: 0.8rem;
  }
`;
exports.Comments = styled_components_1.default.div ``;

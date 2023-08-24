"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulletinPostBtn = exports.Title = exports.TitleRow = exports.FilterRow = exports.SubContent = exports.MainContent = exports.Main = exports.Wrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.Wrapper = styled_components_1.default.section `
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  height: 175vh;
  width: 100%;
  display: flex;
  align-items: center;
`;
exports.Main = styled_components_1.default.div `
  width: 100%;
  height: 100%;
  margin-top: 200px;
  margin-left: 4.5rem;
  margin-right: 4.5rem;
  display: grid;
  grid-template-columns: 5fr 2fr;
  font-family: "Source Sans Pro", "Nanum Gothic", sans-serif;
`;
exports.MainContent = styled_components_1.default.div `
  width: 95%;
`;
exports.SubContent = styled_components_1.default.div `
  width: 100%;
`;
exports.FilterRow = styled_components_1.default.div `
  height: 5rem;
`;
exports.TitleRow = styled_components_1.default.div `
  height: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Nanum Gothic", sans-serif;
`;
exports.Title = styled_components_1.default.span `
  font-size: 5vh;
  font-weight: 600;
  color: ${(props) => props.theme.main.blue};
  font-family: "Nanum Gothic", sans-serif;
`;
exports.BulletinPostBtn = styled_components_1.default.button `
  background-color: ${(props) => props.theme.main.blue};
  color: ${(props) => props.theme.textColor};
  &:hover {
    background-color: ${(props) => props.theme.main.lightBlue};
  }
`;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WoolfieIcon = exports.ClassieBtn = exports.DWBtn = exports.Icon = exports.IconRow = exports.Row = exports.Container = exports.Course = exports.Courses = exports.Title = exports.TitleRow = exports.FilterRow = exports.SubContent = exports.MainContent = exports.Main = exports.Wrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.Wrapper = styled_components_1.default.section `
  height: 100%;
  width: 100%;
`;
exports.Main = styled_components_1.default.div `
  height: 100%;
  margin-left: 4.5rem;
  margin-right: 4.5rem;
  display: grid;
  grid-template-columns: 5fr 2fr;
`;
exports.MainContent = styled_components_1.default.div `
  width: 100%;
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
`;
exports.Title = styled_components_1.default.span `
  font-size: 5vh;
  font-weight: 600;
  color: ${(props) => props.theme.main.blue};
  font-family: "Bebas Neue", cursive;
`;
exports.Courses = styled_components_1.default.div `
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
exports.Course = styled_components_1.default.div `
  color: ${(props) => props.theme.textColor.lighter};
  border: 2px solid ${(props) => props.theme.textColor.lighter};
  background-color: ${(props) => props.theme.bgColor.lighter};
  border-radius: 10px;
  margin-right: 2rem;
  margin-bottom: 1rem;
  box-shadow: 3px 0px 0px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;
exports.Container = styled_components_1.default.div `
  padding: 1rem;
`;
exports.Row = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
`;
exports.IconRow = styled_components_1.default.div `
  display: flex;
  justify-content: flex-end;
`;
exports.Icon = styled_components_1.default.div `
  display: flex;
`;
exports.DWBtn = styled_components_1.default.button `
  background-color: ${(props) => props.theme.main.blue};
  color: ${(props) => props.theme.textColor};
  display: flex;
  &:hover {
    background-color: ${(props) => props.theme.main.lightBlue};
  }
  width: 11.5rem;
  margin-right: 2rem;
  margin-bottom: 0.4rem;
  font-weight: 500;
`;
exports.ClassieBtn = styled_components_1.default.button `
  background-color: ${(props) => props.theme.main.darkred};
  color: ${(props) => props.theme.textColor};
  display: flex;
  &:hover {
    background-color: ${(props) => props.theme.main.red};
  }
  width: 11.5rem;
  margin-right: 2rem;
  font-weight: 500;
`;
exports.WoolfieIcon = styled_components_1.default.img `
  width: 20%;
  margin-right: 10px;
  margin-left: -5px;
`;

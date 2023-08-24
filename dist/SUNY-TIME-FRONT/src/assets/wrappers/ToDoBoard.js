"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = exports.Area = exports.Title = exports.Wrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.Wrapper = styled_components_1.default.div `
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.todoBoardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
exports.Title = styled_components_1.default.h2 `
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
exports.Area = styled_components_1.default.div `
  background-color: ${(props) => props.isDraggingOver
    ? "#dfe6e9"
    : props.isDraggingFromThis
        ? "#b2bec3"
        : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;
exports.Form = styled_components_1.default.form `
  width: 100%;
  input {
    width: 100%;
  }
`;

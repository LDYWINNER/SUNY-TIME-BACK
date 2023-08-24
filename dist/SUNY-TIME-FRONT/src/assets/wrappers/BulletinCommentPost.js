"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Row = exports.InputContainer = exports.ButtonContainer = exports.Button = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.Button = styled_components_1.default.button `
  background-color: ${(props) => props.theme.main.blue};
  color: ${(props) => props.theme.white.darker};
  font-size: 18px;
  margin-left: 0.5rem;
`;
exports.ButtonContainer = styled_components_1.default.div `
  display: flex;
  align-items: center;
  label {
    font-size: 16px;
    font-weight: 500;
    margin-left: 0.5rem;
  }
  input {
    background-color: ${(props) => props.theme.main.blue};
    width: 20px;
    height: 20px;
  }
`;
exports.InputContainer = styled_components_1.default.div `
  width: 100%;
  margin-right: 0.5rem;
`;
exports.Row = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.4rem;
  margin-top: 1rem;
`;

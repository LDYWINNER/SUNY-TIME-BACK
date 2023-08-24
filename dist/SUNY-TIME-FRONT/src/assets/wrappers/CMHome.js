"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Temp = exports.Col = exports.Wrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.Wrapper = styled_components_1.default.section `
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  z-index: -10;
`;
exports.Col = styled_components_1.default.div `
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
exports.Temp = styled_components_1.default.div `
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 200px;
    text-align: center;
    padding-left: 50px;
  }
`;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = exports.Wrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.Wrapper = styled_components_1.default.section `
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
`;
exports.Main = styled_components_1.default.div `
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

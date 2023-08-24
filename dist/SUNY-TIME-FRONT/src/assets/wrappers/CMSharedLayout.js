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
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  .bulletin-main {
    height: 100%;
    width: 100%;
    margin-top: 100px;
    display: flex;
  }
  .bulletin {
    width: 100%;
  }
  .toggle-btn {
    background-color: ${(props) => props.theme.main.blue};
    padding: 5px;
    border-radius: 0px 5px 5px 0px;
    font-size: 1.5rem;
    color: #f8efba;
    cursor: pointer;
    display: flex;
    position: fixed;
    align-items: center;
    top: 150px;
    left: 250px;
    transition: var(--transition);
  }
  .toggle-btn-hide {
    top: 150px;
    left: 0px;
    position: fixed;
  }
`;
exports.Main = styled_components_1.default.div `
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

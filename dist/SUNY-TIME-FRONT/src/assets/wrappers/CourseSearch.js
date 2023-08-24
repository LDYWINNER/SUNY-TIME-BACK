"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filters = exports.Row = exports.Wrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.Wrapper = styled_components_1.default.div `
  input[type="radio"] {
    display: none;
  }

  label {
    display: inline-block;
    cursor: pointer;
    height: 30px;
    padding: 5px 15px;
    border: 1px solid ${(props) => props.theme.textColor.lighter};
    border-radius: 15px;
    margin-right: 5px;
    line-height: 24px;
    text-align: center;
    font-weight: bold;
    font-size: 13px;
    background-color: ${(props) => props.theme.bgColor.lighter};
    color: ${(props) => props.theme.textColor.lighter};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input[type="radio"]:checked + label {
    background-color: ${(props) => props.theme.textColor.lighter};
    color: ${(props) => props.theme.bgColor.lighter};
  }
`;
exports.Row = styled_components_1.default.div `
  display: flex;
  margin-bottom: 10px;
  margin-right: 2rem;

  input {
    width: 100%;
    height: 40px;
    padding: 0.375rem 0.75rem;
    border-radius: var(--borderRadius);
    background-color: ${(props) => props.theme.bgColor.lighter};
    color: ${(props) => props.theme.textColor.lighter};
    border: 1px solid ${(props) => props.theme.textColor.lighter};
  }
`;
exports.Filters = styled_components_1.default.div `
  display: flex;
`;

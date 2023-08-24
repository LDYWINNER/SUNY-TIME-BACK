"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = exports.Name = exports.Buttons = exports.SecondRow = exports.Row = exports.Comment = exports.Wrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.Wrapper = styled_components_1.default.div ``;
exports.Comment = styled_components_1.default.div `
  margin-top: 1rem;
  border-radius: 5px;
  padding: 0.5rem;
  .time {
    color: ${(props) => props.theme.textColor.darker};
    font-size: 0.8rem;
  }
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.1);
`;
exports.Row = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;
exports.SecondRow = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
exports.Buttons = styled_components_1.default.div `
  display: flex;
  h4 {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    align-self: center;
  }
`;
exports.Name = styled_components_1.default.h4 `
  font-weight: 500;
  font-size: 18px;
`;
exports.Text = styled_components_1.default.h4 ``;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostButton = exports.BulletinPostBtn = exports.Wrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.Wrapper = styled_components_1.default.section ``;
exports.BulletinPostBtn = styled_components_1.default.button `
  background-color: ${(props) => props.theme.main.blue};
  &:hover {
    background-color: ${(props) => props.theme.main.lightBlue};
  }
`;
exports.PostButton = styled_components_1.default.div `
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

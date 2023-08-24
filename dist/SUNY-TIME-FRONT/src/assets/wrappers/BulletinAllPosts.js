"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = exports.User = exports.Container = exports.Row = exports.Post = exports.Wrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.Wrapper = styled_components_1.default.section `
  h2 {
    text-transform: none;
    font-weight: 800;
  }
  h4 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    width: 90%;
  }
  h5 {
    font-size: 0.8rem;
  }
  @media (min-width: 992px) {
  }
`;
exports.Post = styled_components_1.default.div `
  color: ${(props) => props.theme.textColor.lighter};
  border: 2px solid ${(props) => props.theme.textColor.lighter};
  background-color: ${(props) => props.theme.bgColor.lighter};
  padding: 1.5rem 1rem;
  border-radius: 10px;
  box-shadow: 3px 0px 0px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;
exports.Row = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
`;
exports.Container = styled_components_1.default.div `
  margin-bottom: 2rem;
`;
exports.User = styled_components_1.default.h6 `
  font-weight: 600;
`;
exports.Icon = styled_components_1.default.div `
  display: flex;
`;

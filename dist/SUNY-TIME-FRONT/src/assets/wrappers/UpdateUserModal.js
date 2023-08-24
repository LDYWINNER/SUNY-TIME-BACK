"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = exports.Logo = exports.Wrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.Wrapper = styled_components_1.default.section `
  font-family: "Bebas Neue", cursive;
  font-size: max(16px, 1.8vh);
  header {
    text-align: center;
    color: ${(props) => props.theme.main.blue};
    font-size: max(40px, 4.5vh);
    font-weight: 500;
  }

  label {
    font-size: max(24px, 2.5vh);
    color: ${(props) => props.theme.main.blue};
  }

  select {
    width: 50%;
    padding: 0.375rem 0.75rem;
    border-radius: var(--borderRadius);
    background: var(--backgroundColor);
    border: 1px solid var(--grey-200);
    margin-bottom: 1rem;
    height: 35px;
    color: var(--grey-400);
  }
`;
exports.Logo = styled_components_1.default.img `
  display: block;
  margin: 0 auto;
  margin-bottom: 1.38rem;
  width: 100%;
`;
exports.Button = styled_components_1.default.button `
  background-color: ${(props) => props.theme.main.blue};
  color: ${(props) => props.theme.white.darker};
  border-radius: 7px;
  width: 4rem;
  height: 2rem;
  font-size: max(20px, 2.3vh);
`;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logo = exports.Wrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.Wrapper = styled_components_1.default.section `
  font-family: "Bebas Neue", cursive;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  display: grid;
  align-items: center;
  .form {
    width: max(400px, 30vw);
    border-top: 10px solid ${(props) => props.theme.main.blue};
    background-color: rgba(255, 255, 255, 0.5);
  }

  h3 {
    text-align: center;
    color: ${(props) => props.theme.main.blue};
    font-size: max(40px, 4.5vh);
    font-weight: 500;
    margin-bottom: 1rem;
  }
  h4 {
    color: ${(props) => props.theme.black.darker};
    font-size: 1.3rem;
    font-weight: 500;
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
    font-size: max(20px, 2.3vh);
    color: ${(props) => props.theme.black.lighter};
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
  .btn {
    font-family: "Bebas Neue", cursive;
    font-size: max(20px, 2.2vh);
    margin-top: 1rem;
    background-color: ${(props) => props.theme.main.blue};
  }
  .member-btn {
    font-family: "Bebas Neue", cursive;
    background: transparent;
    border: transparent;
    color: ${(props) => props.theme.main.blue};
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
    font-size: max(20px, 2.3vh);
  }
`;
exports.Logo = styled_components_1.default.img `
  display: block;
  margin: 0 auto;
  margin-bottom: 1.38rem;
  width: 100%;
`;

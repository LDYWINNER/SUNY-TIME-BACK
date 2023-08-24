"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarRating = exports.Footer = exports.FormRow = exports.Row = exports.Button = exports.Logo = exports.Wrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.Wrapper = styled_components_1.default.section `
  background-color: ${(props) => props.theme.bgColor.lighter};
  font-family: "Bebas Neue", cursive;
  font-size: max(16px, 1.8vh);
  border-radius: 10px;
  header {
    text-align: center;
    color: ${(props) => props.theme.main.blue};
    font-size: max(40px, 4.5vh);
    font-weight: 500;
  }
  label {
    font-family: "Bebas Neue", "Nanum Gothic", sans-serif;
    font-size: 24px;
    color: ${(props) => props.theme.main.blue};
    margin-bottom: -5px;
    margin-right: 5px;
    font-weight: 400;
  }
  select {
    font-family: "Bebas Neue", "Nanum Gothic", sans-serif;
    padding: 0.375rem 0.75rem;
    border-radius: var(--borderRadius);
    background: var(--backgroundColor);
    border: 1px solid var(--grey-200);
    margin-bottom: 1rem;
    height: 35px;
    color: var(--grey-400);
  }
  option {
    font-family: "Bebas Neue", "Nanum Gothic", sans-serif;
  }
  textarea {
    font-family: "Bebas Neue", "Nanum Gothic", sans-serif;
    margin-top: 7px;
    height: 15vh;
  }
  span {
    font-size: 24px;
    margin-right: 5px;
  }
  p {
    font-family: "Bebas Neue", "Nanum Gothic", sans-serif;
  }

  .on {
    color: red;
  }
  .dark-on {
    color: yellow;
  }
  .off {
    color: #ccc;
  }
  .tooltip-icon {
    color: ${(props) => props.theme.main.blue};
  }
  .checkbox-div {
    display: inline-block;
  }
  #anonymity {
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 0.2rem;
  }
`;
exports.Logo = styled_components_1.default.img `
  display: block;
  margin: 0 auto;
  margin-bottom: 1.38rem;
  width: 35%;
`;
exports.Button = styled_components_1.default.button `
  font-family: "Bebas Neue", "Nanum Gothic", sans-serif;
  background-color: ${(props) => props.theme.main.blue};
  color: ${(props) => props.theme.white.darker};
  border-radius: 7px;
  width: 4rem;
  height: 2rem;
  font-size: max(20px, 2.3vh);
`;
exports.Row = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
exports.FormRow = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
exports.Footer = styled_components_1.default.div `
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
exports.StarRating = styled_components_1.default.div `
  .star {
    font-size: 150%;
  }
`;

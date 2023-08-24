"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const Wrapper = styled_components_1.default.main `
  text-align: center;
  img {
    max-width: 50vw;
    display: block;
    margin-bottom: 2rem;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    font-size: 36px;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  p,
  a {
    font-size: 24px;
    font-weight: 300;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.white.darker};
  }
  a {
    color: ${(props) => props.theme.white.darker};
    text-decoration: underline;
    text-transform: capitalize;
  }
`;
exports.default = Wrapper;

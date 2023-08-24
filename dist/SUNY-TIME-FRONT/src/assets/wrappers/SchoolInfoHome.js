"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoItem = exports.Logo = exports.CDCBlock = exports.Block = exports.Blocks = exports.Wrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.Wrapper = styled_components_1.default.section `
  height: 110vh;
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 90px;
  padding-bottom: 50px;
  background-color: ${(props) => props.theme.bgColor.lighter};
  .main-blue {
    background-color: ${(props) => props.theme.main.blue};
    color: ${(props) => props.theme.white.lighter};
    &:hover {
      background-color: ${(props) => props.theme.white.darker};
      color: ${(props) => props.theme.main.blue};
    }
  }
  .light-blue {
    background-color: ${(props) => props.theme.main.lightBlue};
    color: ${(props) => props.theme.white.darker};
    &:hover {
      background-color: ${(props) => props.theme.white.darker};
      color: ${(props) => props.theme.main.lightBlue};
    }
  }
  .etc {
    background-color: ${(props) => props.theme.white.darker};
    color: ${(props) => props.theme.main.blue};
    &:hover {
      background-color: ${(props) => props.theme.main.blue};
      color: ${(props) => props.theme.white.lighter};
    }
  }

  .big-block {
    grid-column: -3 / -1;
  }

  h4 {
    font-size: 1.2rem;
  }
`;
exports.Blocks = styled_components_1.default.div `
  height: 100%;
  width: 100%;
  margin: auto 5%;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(5, minmax(20%, 1fr));
  grid-template-rows: repeat(4, minmax(25%, 1fr));
`;
exports.Block = styled_components_1.default.div `
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 5%;
  font-weight: 600;
  h4 {
    margin-top: 5%;
    margin-bottom: 5%;
  }
`;
exports.CDCBlock = styled_components_1.default.div `
  height: 100%;
  width: 100%;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  color: ${(props) => props.theme.main.blue};
  padding-top: 5%;
  padding-left: 2%;
  font-weight: 600;

  div {
    width: 15rem;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.white.darker};
    border-radius: 10px;
    h4 {
      margin-left: 2%;
      margin-right: 2%;
    }
    &:hover {
      background-color: ${(props) => props.theme.main.lightBlue};
    }
  }
`;
exports.Logo = styled_components_1.default.div `
  background-color: white;
  grid-column: 1 / 3;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
  h1 {
    height: 100%;
    width: 100%;
    font-size: 5rem;
    font-weight: 600;
    text-align: center;
    padding-top: 2rem;
    background-color: ${(props) => props.theme.white.darker};
    color: ${(props) => props.theme.main.blue};
    &:hover {
      background-color: ${(props) => props.theme.main.blue};
      color: ${(props) => props.theme.white.lighter};
    }
  }
`;
exports.LogoItem = styled_components_1.default.img `
  height: 100%;
  width: 100%;
`;

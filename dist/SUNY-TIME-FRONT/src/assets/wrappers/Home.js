"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logo = exports.SUNYTIME = exports.Img = exports.LogoDate = exports.Title = exports.Welcome = exports.Greeting = exports.WeatherDiv = exports.MainContent = exports.Main = exports.Wrapper = void 0;
const framer_motion_1 = require("framer-motion");
const styled_components_1 = __importDefault(require("styled-components"));
const Wrapper = styled_components_1.default.div `
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  padding-bottom: 200px;
  height: 100vh;
  width: 100%;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.white.lighter};
`;
exports.Wrapper = Wrapper;
const Logo = (0, styled_components_1.default)(framer_motion_1.motion.img) `
  margin-right: 50px;
  width: 150px;
  height: 50px;
`;
exports.Logo = Logo;
const Main = styled_components_1.default.div `
  font-family: "Bebas Neue", cursive;
`;
exports.Main = Main;
const MainContent = styled_components_1.default.div `
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 30px;
  max-width: 70vw;
  margin: 4vh auto 10vh auto;
`;
exports.MainContent = MainContent;
const WeatherDiv = styled_components_1.default.div `
  position: absolute;
  left: 2vw;
  bottom: 25vh;
`;
exports.WeatherDiv = WeatherDiv;
const Greeting = styled_components_1.default.div ``;
exports.Greeting = Greeting;
const Welcome = styled_components_1.default.h1 `
  font-size: 4vw;
  font-weight: 500;
  text-align: center;
`;
exports.Welcome = Welcome;
const Title = styled_components_1.default.span `
  display: inline;
  background-image: linear-gradient(to right, firebrick, darkorange);
  background-size: 100% 10%;
  background-repeat: no-repeat;
  background-position: center bottom;
`;
exports.Title = Title;
const SUNYTIME = styled_components_1.default.span `
  display: inline;
  background-color: ${(props) => props.theme.main.lightBlue};
  padding: 5px;
`;
exports.SUNYTIME = SUNYTIME;
const LogoDate = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin-right: 4vw;
`;
exports.LogoDate = LogoDate;
const Img = styled_components_1.default.img `
  width: 50%;
  height: 100%;
`;
exports.Img = Img;

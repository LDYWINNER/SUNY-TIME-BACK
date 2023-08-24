"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const styled_components_1 = __importDefault(require("styled-components"));
const navbar_logo_svg_1 = __importDefault(require("../assets/images/navbar_logo.svg"));
const Wrapper = styled_components_1.default.div `
  background-color: black;
  color: white;
  width: 100%;
  height: 200px;
  padding-top: 20px;
  display: flex;
  align-items: flex-start;
  padding-left: 10px;
`;
const Logo = styled_components_1.default.img `
  display: block;
  width: 15%;
`;
const Content = styled_components_1.default.div `
  color: white;
  display: flex;
  flex-direction: column;
  font-weight: 500;
  margin-left: 80px;
  margin-top: 10px;
  a {
    margin-bottom: 10px;
  }
`;
const Footer = () => {
    return (<Wrapper>
      <Logo src={navbar_logo_svg_1.default} alt="sunytime" className="logo"/>
      <Content>
        <react_router_dom_1.Link to="mailto:sunytime-auth@naver.com">
          <span>FAQ</span>
        </react_router_dom_1.Link>
        <react_router_dom_1.Link to="mailto:sunytime-auth@naver.com">
          <span>Contact</span>
        </react_router_dom_1.Link>
        <react_router_dom_1.Link to="https://forms.gle/C1KPvABMzFSGCUVM6">
          <span>Feedback</span>
        </react_router_dom_1.Link>
      </Content>
    </Wrapper>);
};
exports.default = Footer;

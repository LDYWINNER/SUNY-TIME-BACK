"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = __importDefault(require("./Router"));
const devtools_1 = require("react-query/devtools");
const styled_components_1 = require("styled-components");
const styled_components_2 = require("styled-components");
require("./assets/css/index.css");
const theme_1 = require("./theme");
const recoil_1 = require("recoil");
const atoms_1 = require("./atoms");
const GlobalStyle = (0, styled_components_2.createGlobalStyle) `
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', 'Nanum Gothic', sans-serif;
  color: black;
  line-height: 1.2;
  color: ${(props) => props.theme.white.darker};
  background-color: black;
}
a {
  text-decoration:none;
  color:inherit;
}
`;
function App() {
    const isDark = (0, recoil_1.useRecoilValue)(atoms_1.isDarkAtom);
    return (<>
      <styled_components_1.ThemeProvider theme={isDark ? theme_1.darkTheme : theme_1.lightTheme}>
        <GlobalStyle />
        <Router_1.default />
        <devtools_1.ReactQueryDevtools initialIsOpen={true}/>
      </styled_components_1.ThemeProvider>
    </>);
}
exports.default = App;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
const assets_1 = require("../assets/assets");
const QuoteDiv = styled_components_1.default.div `
  font-size: 1.6vw;
  font-weight: 500;
  font-family: "Bebas Neue", "Nanum Gothic", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const QuoteText = styled_components_1.default.span `
  margin-bottom: 2vh;
`;
const Author = styled_components_1.default.span ``;
function Quotes() {
    const [quote, setQuote] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        setQuote(assets_1.quotes[Math.floor(Math.random() * assets_1.quotes.length)]);
    }, []);
    return (<QuoteDiv>
      <QuoteText>{quote === null || quote === void 0 ? void 0 : quote.quote}</QuoteText>
      <Author>{quote === null || quote === void 0 ? void 0 : quote.author}</Author>
    </QuoteDiv>);
}
exports.default = Quotes;

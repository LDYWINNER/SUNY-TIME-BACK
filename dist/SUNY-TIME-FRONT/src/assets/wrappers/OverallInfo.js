"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Span = exports.NoReviewContainer = exports.Chart = exports.Charts = exports.Wrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.Wrapper = styled_components_1.default.div `
  width: 130%;
  font-weight: 500;
  h1 {
    font-size: 30px;
    margin-bottom: 20px;
  }
  h4 {
    margin-bottom: 10px;
  }
  select {
    padding: 0.375rem 0.75rem;
    border-radius: var(--borderRadius);
    background: var(--backgroundColor);
    border: 1px solid var(--grey-200);
    margin-bottom: 1rem;
    height: 35px;
    color: var(--grey-400);
  }
`;
exports.Charts = styled_components_1.default.div `
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
exports.Chart = styled_components_1.default.div `
  width: 50%;
`;
exports.NoReviewContainer = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  select {
    padding: 0.375rem 0.75rem;
    border-radius: var(--borderRadius);
    background: var(--backgroundColor);
    border: 1px solid var(--grey-200);
    margin-bottom: 1rem;
    height: 35px;
    color: var(--grey-400);
  }
`;
exports.Span = styled_components_1.default.span `
  font-weight: 600;
  font-size: 1rem;
`;

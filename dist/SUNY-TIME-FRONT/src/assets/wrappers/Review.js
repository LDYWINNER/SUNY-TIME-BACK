"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Span = exports.Instructor = exports.Semester = exports.NoReviewSpan = exports.Row = exports.Likes = exports.Name = exports.Container = exports.Grade = exports.SingleReview = exports.Reviews = exports.CourseReviewBtn = exports.ButtonContainer = exports.Wrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.Wrapper = styled_components_1.default.section `
  width: 100%;
  height: 100%;
`;
exports.ButtonContainer = styled_components_1.default.div `
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;
exports.CourseReviewBtn = styled_components_1.default.button `
  background-color: ${(props) => props.theme.main.blue};
  display: flex;
  align-items: center;
  h4 {
    margin-left: 10px;
  }
  &:hover {
    background-color: ${(props) => props.theme.main.lightBlue};
  }
`;
exports.Reviews = styled_components_1.default.div ``;
exports.SingleReview = styled_components_1.default.div `
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  font-weight: 500;
  h4 {
    margin-bottom: 5px;
  }
`;
exports.Grade = styled_components_1.default.div `
  margin-left: 5px;
  color: ${(props) => props.theme.main.darkred};
`;
exports.Container = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
exports.Name = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
`;
exports.Likes = styled_components_1.default.div `
  display: flex;
  justify-content: flex-end;
  align-items: center;
  h4 {
    margin-left: 5px;
  }
`;
exports.Row = styled_components_1.default.div `
  display: flex;
`;
exports.NoReviewSpan = styled_components_1.default.span `
  font-size: 1rem;
  font-weight: 500;
`;
exports.Semester = styled_components_1.default.div `
  margin-left: 5px;
`;
exports.Instructor = styled_components_1.default.div `
  margin-left: 5px;
  color: ${(props) => props.theme.main.lightBlue};
`;
exports.Span = styled_components_1.default.span `
  font-weight: 600;
  font-size: 1rem;
`;

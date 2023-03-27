import styled from "styled-components";

export const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  border: 2px solid tomato;
`;

export const CourseReviewBtn = styled.button`
  background-color: ${(props) => props.theme.main.blue};
  color: ${(props) => props.theme.textColor};
  display: flex;
  &:hover {
    background-color: ${(props) => props.theme.main.lightBlue};
  }
`;

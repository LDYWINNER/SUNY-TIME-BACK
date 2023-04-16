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

export const ClassieBtn = styled.button`
  background-color: ${(props) => props.theme.main.darkred};
  color: ${(props) => props.theme.textColor};
  display: flex;
  &:hover {
    background-color: ${(props) => props.theme.main.red};
  }
  width: 15rem;
`;

export const WoolfieIcon = styled.img`
  width: 20%;
`;

export const Reviews = styled.div``;

export const SingleReview = styled.div``;

export const Row = styled.div`
  display: flex;
`;

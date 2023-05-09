import styled from "styled-components";

export const Wrapper = styled.section`
  width: 100%;
  height: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

export const CourseReviewBtn = styled.button`
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

export const Reviews = styled.div``;

export const SingleReview = styled.div`
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  font-weight: 500;
  h4 {
    margin-bottom: 5px;
  }
`;

export const Grade = styled.div`
  margin-left: 5px;
  color: ${(props) => props.theme.main.darkred};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Name = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Likes = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  h4 {
    margin-left: 5px;
  }
`;

export const Row = styled.div`
  display: flex;
`;

export const NoReviewSpan = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

export const Semester = styled.div`
  margin-left: 5px;
`;

export const Instructor = styled.div`
  margin-left: 5px;
  color: ${(props) => props.theme.main.lightBlue};
`;

export const Span = styled.span`
  font-weight: 600;
  font-size: 1rem;
`;

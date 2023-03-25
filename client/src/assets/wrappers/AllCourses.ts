import styled from "styled-components";

export const Wrapper = styled.section`
  height: 100%;
  width: 100%;
`;

export const Main = styled.div`
  height: 100%;
  margin-left: 4.5rem;
  margin-right: 4.5rem;
  display: grid;
  grid-template-columns: 5fr 2fr;
`;

export const MainContent = styled.div`
  width: 100%;
`;

export const SubContent = styled.div`
  width: 100%;
`;

export const FilterRow = styled.div`
  height: 5rem;
`;

export const TitleRow = styled.div`
  height: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.span`
  font-size: 5vh;
  font-weight: 600;
  color: ${(props) => props.theme.main.blue};
  font-family: "Bebas Neue", cursive;
`;

export const Courses = styled.div``;

export const Course = styled.div``;

export const Container = styled.div`
  margin-bottom: 2rem;
`;

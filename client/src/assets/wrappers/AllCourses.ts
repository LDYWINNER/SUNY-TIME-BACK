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

export const Courses = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const Course = styled.div`
  color: ${(props) => props.theme.textColor.lighter};
  border: 2px solid ${(props) => props.theme.textColor.lighter};
  background-color: ${(props) => props.theme.bgColor.lighter};
`;

export const Container = styled.div`
  margin-bottom: 2rem;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Icon = styled.div`
  display: flex;
`;

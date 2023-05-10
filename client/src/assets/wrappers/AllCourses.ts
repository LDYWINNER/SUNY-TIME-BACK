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
  border-radius: 10px;
  margin-right: 2rem;
  margin-bottom: 1rem;
  box-shadow: 3px 0px 0px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

export const Container = styled.div`
  padding: 1rem;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const IconRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Icon = styled.div`
  display: flex;
`;

export const DWBtn = styled.button`
  background-color: ${(props) => props.theme.main.blue};
  color: ${(props) => props.theme.textColor};
  display: flex;
  &:hover {
    background-color: ${(props) => props.theme.main.lightBlue};
  }
  width: 11.5rem;
  margin-right: 2rem;
  margin-bottom: 0.4rem;
  font-weight: 500;
`;

export const ClassieBtn = styled.button`
  background-color: ${(props) => props.theme.main.darkred};
  color: ${(props) => props.theme.textColor};
  display: flex;
  &:hover {
    background-color: ${(props) => props.theme.main.red};
  }
  width: 11.5rem;
  margin-right: 2rem;
  font-weight: 500;
`;

export const WoolfieIcon = styled.img`
  width: 20%;
  margin-right: 10px;
  margin-left: -5px;
`;

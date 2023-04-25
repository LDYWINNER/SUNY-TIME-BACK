import styled from "styled-components";

export const Wrapper = styled.section<{ bgImage: string }>`
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  height: 175vh;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Main = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 200px;
  margin-left: 4.5rem;
  margin-right: 4.5rem;
  display: grid;
  grid-template-columns: 5fr 2fr;
`;

export const MainContent = styled.div`
  width: 95%;
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

export const BulletinPostBtn = styled.button`
  background-color: ${(props) => props.theme.main.blue};
  color: ${(props) => props.theme.textColor};
  &:hover {
    background-color: ${(props) => props.theme.main.lightBlue};
  }
`;

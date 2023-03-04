import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const FilterRow = styled.div`
  height: 10%;
`;

export const TitleRow = styled.div`
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 30px;
  margin-right: 30px;
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

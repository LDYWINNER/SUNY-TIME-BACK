import styled from "styled-components";

export const Wrapper = styled.section``;

export const BulletinPostBtn = styled.button`
  background-color: ${(props) => props.theme.main.blue};
  color: ${(props) => props.theme.textColor};
  &:hover {
    background-color: ${(props) => props.theme.main.lightBlue};
  }
`;

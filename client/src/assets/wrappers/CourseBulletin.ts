import styled from "styled-components";

export const Wrapper = styled.section``;

export const BulletinPostBtn = styled.button`
  background-color: ${(props) => props.theme.main.blue};
  &:hover {
    background-color: ${(props) => props.theme.main.lightBlue};
  }
`;

export const PostButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

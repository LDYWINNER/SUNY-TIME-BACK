import styled from "styled-components";

export const Wrapper = styled.section<{ bgImage: string }>`
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Main = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 200px;
`;

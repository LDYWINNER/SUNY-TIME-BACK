import styled from "styled-components";

export const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: ${(props) => props.theme.bgColor.darker};
`;

export const Col = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

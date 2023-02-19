import styled from "styled-components";
import { Header } from "../Components";

const Wrapper = styled.div`
  height: 200vh;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
`;

function Info() {
  return (
    <>
      <Header />
      <Wrapper>Info</Wrapper>
    </>
  );
}
export default Info;

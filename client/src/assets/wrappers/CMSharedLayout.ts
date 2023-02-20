import styled from "styled-components";

const Wrapper = styled.section<{ bgImage: string }>`
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
`;
export default Wrapper;

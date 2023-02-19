import styled from "styled-components";

const Wrapper = styled.section<{ bgImage: string }>`
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  .bulletin {
    display: grid;
    grid-template-columns: 1fr;
  }
  .bulletin-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
`;
export default Wrapper;

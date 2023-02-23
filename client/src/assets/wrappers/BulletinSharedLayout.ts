import styled from "styled-components";

const Wrapper = styled.section<{ bgImage: string }>`
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  .bulletin-main {
    height: 100%;
    width: 100%;
    margin-top: 100px;
    display: flex;
  }
  .bulletin {
    display: grid;
    grid-template-columns: 1fr;
  }
  .bulletin-page {
    margin: 0 auto;
    padding: 2rem 0;
  }
  .toggle-btn {
    background-color: ${(props) => props.theme.main.blue};
    padding: 5px;
    border-radius: 0px 5px 5px 0px;
    font-size: 1.5rem;
    color: #f8efba;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

export default Wrapper;

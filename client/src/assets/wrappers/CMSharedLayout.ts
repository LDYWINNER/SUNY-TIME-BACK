import styled from "styled-components";

export const Wrapper = styled.section<{ bgImage: string }>`
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
    width: 100%;
  }
  .toggle-btn {
    background-color: ${(props) => props.theme.main.blue};
    padding: 5px;
    border-radius: 0px 5px 5px 0px;
    font-size: 1.5rem;
    color: #f8efba;
    cursor: pointer;
    display: flex;
    position: fixed;
    align-items: center;
    top: 150px;
    left: 250px;
    transition: var(--transition);
  }
  .toggle-btn-hide {
    top: 150px;
    left: 0px;
    position: fixed;
  }
`;

export const Main = styled.div`
  width: 100%;
  height: 100%;
`;

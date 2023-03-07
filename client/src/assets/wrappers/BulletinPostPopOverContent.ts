import styled from "styled-components";

export const Wrapper = styled.div`
  color: ${(props) => props.theme.textColor.darker};
  font-weight: 500;
  font-family: "Bebas Neue", cursive;
  font-size: max(16px, 1.8vh);
  margin: 10px;
  header {
    text-align: center;
    color: ${(props) => props.theme.main.blue};
    font-size: max(40px, 4.5vh);
    font-weight: 500;
  }

  label {
    font-size: max(24px, 2.5vh);
    color: ${(props) => props.theme.main.blue};
  }

  select {
    width: 50%;
    padding: 0.375rem 0.75rem;
    border-radius: var(--borderRadius);
    background: var(--backgroundColor);
    border: 1px solid var(--grey-200);
    margin-bottom: 1rem;
    height: 35px;
    color: var(--grey-400);
  }

  textarea {
    height: 100px;
  }

  .new-board {
    width: 50%;
  }
  .tooltip-icon {
    color: ${(props) => props.theme.main.blue};
  }
  .checkbox-div {
    display: inline-block;
  }
  #anonymity {
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 0.2rem;
  }
`;

export const Button = styled.button`
  background-color: ${(props) => props.theme.main.blue};
  color: ${(props) => props.theme.white.darker};
  border-radius: 7px;
  width: 4rem;
  height: 2rem;
  font-size: max(20px, 2.3vh);
  float: right;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

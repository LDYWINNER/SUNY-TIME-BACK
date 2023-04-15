import styled from "styled-components";

export const Button = styled.button`
  background-color: ${(props) => props.theme.main.blue};
  color: ${(props) => props.theme.white.darker};
  font-size: 18px;
  margin-left: 0.5rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  label {
    font-size: 16px;
    font-weight: 500;
    margin-left: 0.5rem;
  }
  input {
    background-color: ${(props) => props.theme.main.blue};
    width: 20px;
    height: 20px;
  }
`;

export const InputContainer = styled.div`
  width: 100%;
  margin-right: 0.5rem;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.4rem;
  margin-top: 1rem;
`;

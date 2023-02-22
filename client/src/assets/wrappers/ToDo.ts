import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

export const Form = styled.form`
  width: 500px;
  margin-bottom: 30px;
  input {
    width: 100%;
  }
`;

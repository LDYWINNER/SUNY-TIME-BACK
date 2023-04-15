import styled from "styled-components";

export const Wrapper = styled.div``;

export const Comment = styled.div`
  margin-top: 1rem;
  border-radius: 5px;
  padding: 0.5rem;
  .time {
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.8rem;
  }
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.1);
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const SecondRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Buttons = styled.div`
  display: flex;
  h4 {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    align-self: center;
  }
`;

export const Name = styled.h4`
  font-weight: 500;
  font-size: 18px;
`;

export const Text = styled.h4``;

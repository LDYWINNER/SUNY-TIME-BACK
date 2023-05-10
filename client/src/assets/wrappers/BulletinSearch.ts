import styled from "styled-components";

export const Wrapper = styled.div`
  input[type="radio"] {
    display: none;
  }

  label {
    display: inline-block;
    cursor: pointer;
    height: 30px;
    width: 7rem;
    border: 1px solid ${(props) => props.theme.textColor.lighter};
    border-radius: 15px;
    margin-right: 5px;
    line-height: 24px;
    text-align: center;
    font-weight: bold;
    font-size: 13px;
    background-color: ${(props) => props.theme.bgColor.lighter};
    color: ${(props) => props.theme.textColor.lighter};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input[type="radio"]:checked + label {
    background-color: ${(props) => props.theme.textColor.lighter};
    color: ${(props) => props.theme.bgColor.lighter};
  }
`;

export const Row = styled.div`
  display: flex;
  margin-bottom: 10px;
  input {
    width: 100%;
    height: 40px;
    padding: 0.375rem 0.75rem;
    border-radius: var(--borderRadius);
    background: var(--backgroundColor);
    border: 1px solid var(--grey-200);
  }
`;

export const Filters = styled.div`
  display: flex;
`;

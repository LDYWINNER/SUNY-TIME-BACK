import styled from "styled-components";

export const Wrapper = styled.div`
  input[type="radio"] {
    display: none;
  }

  label {
    display: inline-block;
    cursor: pointer;
    height: 30px;
    padding: 5px 15px;
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
    width: 95%;
    height: 40px;
    padding: 0.375rem 0.75rem;
    border-radius: var(--borderRadius);
    background-color: ${(props) => props.theme.bgColor.lighter};
    color: ${(props) => props.theme.textColor.lighter};
    border: 1px solid ${(props) => props.theme.textColor.lighter};
  }
`;

export const Filters = styled.div`
  display: flex;
`;

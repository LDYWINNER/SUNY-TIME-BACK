import styled from "styled-components";

export const Wrapper = styled.div`
  input[type="radio"] {
    display: none;
  }

  label {
    display: inline-block;
    cursor: pointer;
    height: 30px;
    width: 90px;
    border: 1px solid #333;
    border-radius: 15px;
    margin-right: 5px;
    line-height: 24px;
    text-align: center;
    font-weight: bold;
    font-size: 13px;
    background-color: #fff;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input[type="radio"]:checked + label {
    background-color: #333;
    color: #fff;
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

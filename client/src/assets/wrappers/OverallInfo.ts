import styled from "styled-components";

export const Wrapper = styled.div`
  width: 130%;
  font-weight: 500;
  h1 {
    font-size: 30px;
    margin-bottom: 20px;
  }
  h4 {
    margin-bottom: 10px;
  }
  select {
    padding: 0.375rem 0.75rem;
    border-radius: var(--borderRadius);
    background: var(--backgroundColor);
    border: 1px solid var(--grey-200);
    margin-bottom: 1rem;
    height: 35px;
    color: var(--grey-400);
  }
`;

export const Charts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const Chart = styled.div`
  width: 50%;
`;

export const NoReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  select {
    padding: 0.375rem 0.75rem;
    border-radius: var(--borderRadius);
    background: var(--backgroundColor);
    border: 1px solid var(--grey-200);
    margin-bottom: 1rem;
    height: 35px;
    color: var(--grey-400);
  }
`;

export const Span = styled.span`
  font-weight: 600;
  font-size: 1rem;
`;

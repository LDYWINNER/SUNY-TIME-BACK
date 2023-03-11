import styled from "styled-components";

export const Wrapper = styled.section`
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  @media (min-width: 992px) {
  }
`;

export const Post = styled.div`
  color: ${(props) => props.theme.textColor.lighter};
  border: 2px solid ${(props) => props.theme.textColor.lighter};
  background-color: ${(props) => props.theme.bgColor.lighter};
  padding: 1.5rem 1rem;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Icon = styled.div`
  display: flex;
`;

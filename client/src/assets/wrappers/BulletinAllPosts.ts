import styled from "styled-components";

export const Wrapper = styled.section`
  h2 {
    text-transform: none;
    font-weight: 800;
  }
  h4 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    width: 90%;
  }
  h5 {
    font-size: 0.8rem;
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

export const Container = styled.div`
  margin-bottom: 2rem;
`;

export const User = styled.h6`
  font-weight: 600;
`;

export const Icon = styled.div`
  display: flex;
`;

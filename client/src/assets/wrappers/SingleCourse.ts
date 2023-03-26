import styled from "styled-components";

export const LoadingWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  @media (min-width: 992px) {
  }
`;

export const Container = styled.div`
  width: 60%;
  height: 100%;
  padding: 10px;
`;

export const Info = styled.div``;

export const Title = styled.span`
  font-size: 5vh;
  font-weight: 600;
  color: ${(props) => props.theme.main.blue};
  font-family: "Bebas Neue", cursive;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

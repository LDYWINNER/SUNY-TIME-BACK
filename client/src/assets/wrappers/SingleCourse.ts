import styled from "styled-components";

export const LoadingWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

export const Container = styled.div`
  z-index: 0;
  width: 70%;
  height: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.bgColor.lighter};
  color: ${(props) => props.theme.textColor.darker};
  padding: 15px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

export const Main = styled.div`
  padding: 0.5rem 3rem;
`;

export const Info = styled.div`
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

export const Title = styled.span`
  font-size: 50px;
  font-weight: 600;
  color: ${(props) => props.theme.main.blue};
  font-family: "Bebas Neue", cursive;
  display: block;
  margin-bottom: 1rem;
`;

export const Likes = styled.div`
  display: flex;
  font-size: 30px;
  h4 {
    margin-left: 5px;
  }
`;

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
  flex-direction: column;
  justify-content: space-between;
  font-size: 30px;
  h4 {
    margin-left: 5px;
  }
  div {
    display: flex;
    justify-content: flex-end;
  }
`;

export const ClassieBtn = styled.button`
  background-color: ${(props) => props.theme.main.darkred};
  color: ${(props) => props.theme.textColor};
  display: flex;
  &:hover {
    background-color: ${(props) => props.theme.main.red};
  }
  width: 15rem;
  font-weight: 600;
  font-size: 18px;
  align-items: center;
`;

export const WoolfieIcon = styled.img`
  width: 20%;
  margin-left: -5px;
  margin-right: 5px;
`;

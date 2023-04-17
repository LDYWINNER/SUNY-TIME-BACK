import styled from "styled-components";

const Wrapper = styled.div<{ bgImage: string }>`
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  padding-bottom: 200px;
  height: 100vh;
  width: 100%;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.white.lighter};
`;

const Main = styled.div`
  font-family: "Bebas Neue", cursive;
`;

const MainContent = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 30px;
  max-width: 70vw;
  margin: 4vh auto 10vh auto;
`;

const WeatherDiv = styled.div`
  position: absolute;
  left: 2vw;
  bottom: 25vh;
`;

const Greeting = styled.div``;

const Welcome = styled.h1`
  font-size: 4vw;
  font-weight: 500;
`;

const Title = styled.span`
  display: inline;
  background-image: linear-gradient(to right, firebrick, darkorange);
  background-size: 100% 10%;
  background-repeat: no-repeat;
  background-position: center bottom;
`;

const SUNYTIME = styled.span`
  display: inline;
  background-color: ${(props) => props.theme.main.lightBlue};
  padding: 5px;
`;

const LogoDate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin-right: 4vw;
`;

const Img = styled.img`
  width: 50%;
  height: 100%;
`;

export {
  Wrapper,
  Main,
  MainContent,
  WeatherDiv,
  Greeting,
  Welcome,
  Title,
  LogoDate,
  Img,
  SUNYTIME,
};

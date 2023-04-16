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
  max-width: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 4vh auto 10vh auto;
  padding: 30px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.3);
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

export { Wrapper, Main, Greeting, Welcome, Title, LogoDate, Img, SUNYTIME };

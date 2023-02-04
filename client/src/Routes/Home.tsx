import { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/final.svg";
import { bgImages } from "../assets/assets";
import { getWeather, IGetWeatherResult } from "../api";
import Quotes from "../Components/Quotes";
import Clock from "../Components/Clock";
import { FakeWeather, Weather } from "../Components/Weather";

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
`;

const Main = styled.div`
  font-family: "Bebas Neue", cursive;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1vh auto 10vh auto;
  padding: 30px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Greeting = styled.div``;

const Welcome = styled.h1`
  font-size: 6vh;
  font-weight: 500;
`;

const Title = styled.span`
  display: inline;
  background-image: linear-gradient(to right, firebrick, darkorange);
  background-size: 100% 10%;
  background-repeat: no-repeat;
  background-position: center bottom;
`;

const LogoDate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin-right: 4vw;
`;

const Img = styled.img`
  width: 400px;
  height: 400px;
`;

function Home() {
  const [bgImage, setbgImage] = useState("");
  const [data, setData] = useState<IGetWeatherResult>();
  const fetchWeather = () => {
    let lat = 0;
    let lon = 0;
    navigator.geolocation.getCurrentPosition(async (position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      setData(await getWeather(lat, lon));
    });
  };
  useEffect(() => {
    fetchWeather();
    setbgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
  }, [bgImage]);
  return (
    <Wrapper bgImage={bgImage}>
      <Main>
        <Greeting>
          <Welcome>
            Hello Username, Welcome to <Title>SUNYTIME</Title>
          </Welcome>
        </Greeting>
        <LogoDate>
          <Img src={logo}></Img>
          <Clock />
        </LogoDate>
        <Quotes />
      </Main>
      {typeof data?.main != "undefined" ? (
        <Weather weatherData={data} />
      ) : (
        <FakeWeather />
      )}
    </Wrapper>
  );
}
export default Home;

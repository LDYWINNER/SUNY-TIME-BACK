import { useEffect, useState } from "react";
import styled from "styled-components";
import img from "../assets/final.svg";
import { bgImages } from "../assets/assets";
import { getWeather, IGetWeatherResult } from "../api";
import Quotes from "../Components/Quotes";
import RealtimeDate from "../Components/Date";
import Weather from "../Components/Weather";

const Wrapper = styled.div<{ bgImage: string }>`
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  padding-bottom: 200px;
  height: 100vh;
  width: 100%;
  padding: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 300px;
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Greeting = styled.div``;

const Welcome = styled.h1`
  font-size: 80px;
  font-weight: 500;
`;

const LogoDate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  padding-right: 50px;
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
          <Welcome>Hello Username, Welcome to SUNYTIME</Welcome>
        </Greeting>
        <LogoDate>
          <Img src={img}></Img>
          <span>Today date</span>
          <RealtimeDate />
        </LogoDate>
        <Quotes />
        {typeof data?.main != "undefined" ? (
          <Weather weatherData={data} />
        ) : (
          <div></div>
        )}
      </Main>
    </Wrapper>
  );
}
export default Home;

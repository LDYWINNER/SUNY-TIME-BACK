import { useEffect, useState } from "react";
import logo from "../assets/images/final.svg";
import { bgImages } from "../assets/assets";
import { getWeather, IGetWeatherResult } from "../api";
import { FakeWeather, Weather, Quotes, Clock, Header } from "../Components";
import {
  Wrapper,
  Main,
  Greeting,
  Welcome,
  Title,
  LogoDate,
  Img,
} from "../assets/wrappers/Home";

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
    <>
      <Header />
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
    </>
  );
}
export default Home;

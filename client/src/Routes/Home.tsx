import { useEffect, useState } from "react";
import logo from "../assets/images/final.svg";
import { bgImages } from "../assets/assets";
import { getWeather, IGetWeatherResult } from "../api";
import { FakeWeather, Weather, Quotes, Clock } from "../Components";
import {
  Wrapper,
  Main,
  Greeting,
  Welcome,
  Title,
  LogoDate,
  SUNYTIME,
  Img,
} from "../assets/wrappers/Home";
import { startInterval } from "../utils";
import { useRecoilValue } from "recoil";
import { globalCurrentState } from "../atoms";

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
  const globalState = useRecoilValue(globalCurrentState);

  useEffect(() => {
    let weatherId: NodeJS.Timer;
    weatherId = startInterval(10, () => {
      fetchWeather();
    });
    setbgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
    return function cleanup() {
      clearInterval(weatherId);
    };
  }, [bgImage]);

  return (
    <Wrapper bgImage={bgImage}>
      <Main>
        <Greeting>
          <Welcome>
            Hello <Title>{globalState.user?.username}</Title>, Welcome to{" "}
            <SUNYTIME>SUNYTIME</SUNYTIME>
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

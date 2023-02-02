import { useEffect, useState } from "react";
import styled from "styled-components";
import img from "../assets/final.svg";
import { bgImages, quotes } from "../assets/assets";
import { useQuery } from "react-query";
import { getWeather, IGetWeatherResult } from "../api";

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

const DateSpan = styled.span`
  color: white;
  font-size: 128px;
  font-weight: 600;
  width: 500px;
`;

const QuoteDiv = styled.div`
  font-size: 24px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const QuoteText = styled.span`
  margin-bottom: 30px;
`;

const Author = styled.span``;

interface IQuote {
  quote: string;
  author: string;
}

function Home() {
  const [bgImage, setbgImage] = useState("");
  const [quote, setQuote] = useState<IQuote>();
  const [date, setDate] = useState("");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const fetchWeather = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
      console.log(`${lat}, ${lon}`);
    });
    return getWeather(lat, lon);
  };
  const { data } = useQuery<IGetWeatherResult>("weather", fetchWeather);
  function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    setDate(`${hours}:${minutes}:${seconds}`);
  }
  useEffect(() => {
    fetchWeather();
    console.log(data);
    setbgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    const clockId = setInterval(getClock, 1000);
    return function cleanup() {
      clearInterval(clockId);
    };
  }, [bgImage, data]);
  return (
    <Wrapper bgImage={bgImage}>
      <Main>
        <Greeting>
          <Welcome>Hello Username, Welcome to SUNYTIME</Welcome>
        </Greeting>
        <LogoDate>
          <Img src={img}></Img>
          <DateSpan>{date}</DateSpan>
        </LogoDate>
        <QuoteDiv>
          <QuoteText>{quote?.quote}</QuoteText>
          <Author>{quote?.author}</Author>
        </QuoteDiv>
      </Main>
    </Wrapper>
  );
}
export default Home;

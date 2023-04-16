import styled from "styled-components";
import { IGetWeatherResult } from "../api";

const WeatherWrapper = styled.div`
  width: 15%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  margin-bottom: 50px;
  position: absolute;
  bottom: 1vh;
`;

const City = styled.span`
  font-size: 2vw;
  font-weight: 400;
  margin-bottom: 5px;
`;

const Info = styled.p`
  font-size: 1.2vw;
  font-weight: 300;
  margin-bottom: 2px;
`;

export function Weather(props: { weatherData: IGetWeatherResult }) {
  const {
    name,
    main: { temp, humidity },
    sys: { sunrise, sunset },
    weather: [{ description }],
  } = props.weatherData;
  return (
    <WeatherWrapper>
      <City>{name}</City>
      <Info>Temperature: {temp} &deg;C</Info>
      <Info>
        Sunrise: {new Date(sunrise * 1000).toLocaleTimeString("en-IN")}
      </Info>
      <Info>Sunset: {new Date(sunset * 1000).toLocaleTimeString("en-IN")}</Info>
      <Info>Description: {description}</Info>
      <Info>Humidity: {humidity} %</Info>
    </WeatherWrapper>
  );
}

export function FakeWeather() {
  return (
    <WeatherWrapper>
      <City>Wait Please</City>
      <Info>Temperature: ?</Info>
      <Info>Sunrise: ?</Info>
      <Info>Sunset: ?</Info>
      <Info>Description: ?</Info>
      <Info>Humidity: ?</Info>
    </WeatherWrapper>
  );
}

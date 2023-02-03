import styled from "styled-components";
import { IGetWeatherResult } from "../api";

const WeatherWrapper = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 50px;
`;

const City = styled.span`
  font-size: 24px;
  font-weight: 400;
`;

const Info = styled.p`
  font-size: 18px;
  font-weight: 300;
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

import styled from "styled-components";
import { IGetWeatherResult } from "../api";

const WeatherWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function Weather(props: { weatherData: IGetWeatherResult }) {
  const {
    name,
    main: { temp, humidity },
    sys: { sunrise, sunset },
    weather: [{ description }],
  } = props.weatherData;
  return (
    <WeatherWrapper>
      <span>{name}</span>
      <p>Temperature: {temp} &deg;C</p>
      <p>Sunrise: {new Date(sunrise * 1000).toLocaleTimeString("en-IN")}</p>
      <p>Sunset: {new Date(sunset * 1000).toLocaleTimeString("en-IN")}</p>
      <p>Description: {description}</p>
      <p>Humidity: {humidity} %</p>
    </WeatherWrapper>
  );
}
export default Weather;

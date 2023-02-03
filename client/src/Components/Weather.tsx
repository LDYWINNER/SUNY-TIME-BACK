import styled from "styled-components";
import { IGetWeatherResult } from "../api";

const WeatherWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function Weather(props: { weatherData: IGetWeatherResult }) {
  const { name } = props.weatherData;
  return (
    <WeatherWrapper>
      <span>{name}</span>
    </WeatherWrapper>
  );
}
export default Weather;

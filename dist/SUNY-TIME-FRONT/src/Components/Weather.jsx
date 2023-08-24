"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeWeather = exports.Weather = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const WeatherWrapper = styled_components_1.default.div `
  width: 15vw;
  height: 18vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  margin-bottom: 50px;
`;
const City = styled_components_1.default.span `
  font-size: 2vw;
  font-weight: 400;
  margin-bottom: 5px;
`;
const Info = styled_components_1.default.p `
  font-size: 1.2vw;
  font-weight: 300;
  margin-bottom: 2px;
`;
function Weather(props) {
    const { name, main: { temp, humidity }, sys: { sunrise, sunset }, weather: [{ description }], } = props.weatherData;
    return (<WeatherWrapper>
      <City>{name}</City>
      <Info>Temperature: {temp} &deg;C</Info>
      <Info>
        Sunrise: {new Date(sunrise * 1000).toLocaleTimeString("en-IN")}
      </Info>
      <Info>Sunset: {new Date(sunset * 1000).toLocaleTimeString("en-IN")}</Info>
      <Info>Description: {description}</Info>
      <Info>Humidity: {humidity} %</Info>
    </WeatherWrapper>);
}
exports.Weather = Weather;
function FakeWeather() {
    return (<WeatherWrapper>
      <City>Wait Please</City>
      <Info>Temperature: ?</Info>
      <Info>Sunrise: ?</Info>
      <Info>Sunset: ?</Info>
      <Info>Description: ?</Info>
      <Info>Humidity: ?</Info>
    </WeatherWrapper>);
}
exports.FakeWeather = FakeWeather;

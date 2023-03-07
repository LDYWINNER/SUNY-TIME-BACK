import axios from "axios";
import { globalCurrentState } from "./atoms";
import {
  getRecoilExternalLoadable,
  setRecoilExternalState,
} from "./RecoilExternalStatePortal";
import { removeUserFromLocalStorage } from "./utils";

export interface IGetWeatherResult {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export async function getWeather(lat: number, lon: number) {
  const response = await fetch(
    `${process.env.REACT_APP_WEATHER_API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
  );
  // console.log(
  //   `${process.env.REACT_APP_WEATHER_API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
  // );
  return await response.json();
}

//axios custom instance
export const authFetch = axios.create({
  baseURL: "/api/v1",
});

//axios interceptors
//request
authFetch.interceptors.request.use(
  (config) => {
    const globalState =
      getRecoilExternalLoadable(globalCurrentState).getValue();
    config.headers["Authorization"] = `Bearer ${globalState.token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//response
authFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);

    console.log(error.response);
    if (error.response.status === 401) {
      //force the user to logout
      setRecoilExternalState(globalCurrentState, (currentState) => {
        return {
          ...currentState,
          user: null,
          token: null,
        };
      });
      removeUserFromLocalStorage();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

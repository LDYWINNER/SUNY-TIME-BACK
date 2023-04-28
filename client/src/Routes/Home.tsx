import { useEffect, useState } from "react";
import logo from "../assets/images/final.svg";
import { bgImages } from "../assets/assets";
import { getWeather, IGetWeatherResult } from "../api";
import { FakeWeather, Weather, Quotes, Clock } from "../Components";
import {
  Wrapper,
  Main,
  MainContent,
  WeatherDiv,
  Greeting,
  Welcome,
  Title,
  LogoDate,
  SUNYTIME,
  Img,
  Logo,
} from "../assets/wrappers/Home";
import { startInterval } from "../utils";
import { useRecoilValue } from "recoil";
import { globalCurrentState } from "../atoms";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import navbarlogo from "../assets/images/navbar_logo.svg";
import img from "../assets/images/working.svg";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (window.innerWidth < 1000) {
      onOpen();
    }
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
        <WeatherDiv>
          {typeof data?.main != "undefined" ? (
            <Weather weatherData={data} />
          ) : (
            <FakeWeather />
          )}
        </WeatherDiv>
        <MainContent>
          <Greeting>
            <Welcome>
              Hello <Title>{globalState.user?.username}</Title>! Welcome to{" "}
              <SUNYTIME>SUNYTIME</SUNYTIME>
            </Welcome>
          </Greeting>
          <LogoDate>
            <Img src={logo}></Img>
            <Clock />
          </LogoDate>
          <Quotes />
        </MainContent>
        <Drawer onClose={onClose} isOpen={isOpen} size="full">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Logo src={navbarlogo} alt="sunytime" />
            </DrawerHeader>
            <DrawerBody fontWeight={500}>
              <p>SUNYTIME doesn't support mobile web view for now... :(</p>
              <p>We are currently working on it so please wait!</p>
              <img src={img} alt="working" />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Main>
    </Wrapper>
  );
}
export default Home;

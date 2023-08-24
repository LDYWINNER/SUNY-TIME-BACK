"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const final_svg_1 = __importDefault(require("../assets/images/final.svg"));
const assets_1 = require("../assets/assets");
const api_1 = require("../api");
const Components_1 = require("../Components");
const Home_1 = require("../assets/wrappers/Home");
const utils_1 = require("../utils");
const recoil_1 = require("recoil");
const atoms_1 = require("../atoms");
const react_2 = require("@chakra-ui/react");
const navbar_logo_svg_1 = __importDefault(require("../assets/images/navbar_logo.svg"));
const working_svg_1 = __importDefault(require("../assets/images/working.svg"));
function Home() {
    var _a;
    const [bgImage, setbgImage] = (0, react_1.useState)("");
    const [data, setData] = (0, react_1.useState)();
    const fetchWeather = () => {
        let lat = 0;
        let lon = 0;
        navigator.geolocation.getCurrentPosition((position) => __awaiter(this, void 0, void 0, function* () {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            setData(yield (0, api_1.getWeather)(lat, lon));
        }));
    };
    const globalState = (0, recoil_1.useRecoilValue)(atoms_1.globalCurrentState);
    const { isOpen, onOpen, onClose } = (0, react_2.useDisclosure)();
    (0, react_1.useEffect)(() => {
        if (window.innerWidth < 768) {
            onOpen();
        }
        let weatherId;
        weatherId = (0, utils_1.startInterval)(10, () => {
            fetchWeather();
        });
        setbgImage(assets_1.bgImages[Math.floor(Math.random() * assets_1.bgImages.length)]);
        return function cleanup() {
            clearInterval(weatherId);
        };
    }, [bgImage]);
    return (<Home_1.Wrapper bgImage={bgImage}>
      <Home_1.Main>
        <Home_1.WeatherDiv>
          {typeof (data === null || data === void 0 ? void 0 : data.main) != "undefined" ? (<Components_1.Weather weatherData={data}/>) : (<Components_1.FakeWeather />)}
        </Home_1.WeatherDiv>
        <Home_1.MainContent>
          <Home_1.Greeting>
            <Home_1.Welcome>
              Hello <Home_1.Title>{(_a = globalState.user) === null || _a === void 0 ? void 0 : _a.username}</Home_1.Title>! Welcome to{" "}
              <Home_1.SUNYTIME>SUNYTIME</Home_1.SUNYTIME>
            </Home_1.Welcome>
          </Home_1.Greeting>
          <Home_1.LogoDate>
            <Home_1.Img src={final_svg_1.default}></Home_1.Img>
            <Components_1.Clock />
          </Home_1.LogoDate>
          <Components_1.Quotes />
        </Home_1.MainContent>
        <react_2.Drawer onClose={onClose} isOpen={isOpen} size="full">
          <react_2.DrawerOverlay />
          <react_2.DrawerContent>
            <react_2.DrawerCloseButton />
            <react_2.DrawerHeader>
              <Home_1.Logo src={navbar_logo_svg_1.default} alt="sunytime"/>
            </react_2.DrawerHeader>
            <react_2.DrawerBody fontWeight={500}>
              <p>SUNYTIME doesn't support mobile web view for now... :(</p>
              <p>We are currently working on it so please wait!</p>
              <working_svg_1.default src={working_svg_1.default} alt="working"/>
            </react_2.DrawerBody>
          </react_2.DrawerContent>
        </react_2.Drawer>
      </Home_1.Main>
    </Home_1.Wrapper>);
}
exports.default = Home;

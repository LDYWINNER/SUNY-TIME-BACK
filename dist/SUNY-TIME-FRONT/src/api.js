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
exports.authFetch = exports.getWeather = void 0;
const axios_1 = __importDefault(require("axios"));
const atoms_1 = require("./atoms");
const RecoilExternalStatePortal_1 = require("./RecoilExternalStatePortal");
const utils_1 = require("./utils");
function getWeather(lat, lon) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${process.env.REACT_APP_WEATHER_API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`);
        // console.log(
        //   `${process.env.REACT_APP_WEATHER_API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        // );
        return yield response.json();
    });
}
exports.getWeather = getWeather;
//axios custom instance
exports.authFetch = axios_1.default.create({
    baseURL: "/api/v1",
});
//axios interceptors
//request
exports.authFetch.interceptors.request.use((config) => {
    // const globalState =
    //   getRecoilExternalLoadable(globalCurrentState).getValue();
    // config.headers["Authorization"] = `Bearer ${globalState.token}`;
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
}, (error) => {
    return Promise.reject(error);
});
//response
exports.authFetch.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.log(error);
    console.log(error.response);
    if (error.response.status === 401) {
        //force the user to logout
        (0, RecoilExternalStatePortal_1.setRecoilExternalState)(atoms_1.globalCurrentState, (currentState) => {
            return Object.assign(Object.assign({}, currentState), { user: null, token: null });
        });
        (0, utils_1.removeUserFromLocalStorage)();
        window.location.reload();
    }
    return Promise.reject(error);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
const ClockWrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
`;
const DateSpan = styled_components_1.default.span `
  color: white;
  font-size: 3vw;
  font-weight: 600;
  text-align: center;
`;
const ClockSpan = styled_components_1.default.span `
  color: white;
  font-size: 6vw;
  font-weight: 600;
  text-align: center;
`;
function Clock() {
    const [time, setTime] = (0, react_1.useState)("");
    const [date, setDate] = (0, react_1.useState)("");
    function getDate() {
        const now = new Date();
        const todayYear = now.getFullYear();
        const todayMonth = now.getMonth() + 1;
        const todayDate = now.getDate();
        const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const dayOfWeek = week[now.getDay()];
        setDate(`${todayYear}/${todayMonth}/${todayDate} ${dayOfWeek}`);
    }
    function getClock() {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        setTime(`${hours}:${minutes}:${seconds}`);
    }
    (0, react_1.useEffect)(() => {
        const clockId = setInterval(() => getClock(), 1000);
        const dateId = setInterval(() => getDate(), 1000);
        return function cleanup() {
            clearInterval(clockId);
            clearInterval(dateId);
        };
    }, []);
    return (<ClockWrapper>
      <DateSpan>{date}</DateSpan>
      <ClockSpan>{time}</ClockSpan>
    </ClockWrapper>);
}
exports.default = Clock;

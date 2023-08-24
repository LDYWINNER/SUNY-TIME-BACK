"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_calendar_1 = __importDefault(require("react-calendar"));
require("react-calendar/dist/Calendar.css");
const SMCalendar_1 = require("../assets/wrappers/SMCalendar");
function SMCalendar() {
    const [calendarDate, setCalendarDate] = (0, react_1.useState)(new Date());
    const onChange = (e) => {
        setCalendarDate(e);
    };
    (0, react_1.useEffect)(() => {
        console.log(calendarDate);
    }, [calendarDate]);
    return (<SMCalendar_1.Wrapper>
      <react_calendar_1.default onChange={onChange} value={calendarDate} locale="en-EN" calendarType="US" formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })} next2Label={null} prev2Label={null} showNeighboringMonth={false}/>
    </SMCalendar_1.Wrapper>);
}
exports.default = SMCalendar;

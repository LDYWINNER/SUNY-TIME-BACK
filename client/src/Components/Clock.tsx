import { useEffect, useState } from "react";
import styled from "styled-components";

const ClockWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DateSpan = styled.span`
  color: white;
  font-size: 5vh;
  font-weight: 600;
  width: 500px;
  text-align: center;
`;

const ClockSpan = styled.span`
  color: white;
  font-size: 10vh;
  font-weight: 600;
  text-align: center;
  width: 500px;
`;

function Clock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
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
  useEffect(() => {
    const clockId = setInterval(() => getClock(), 1000);
    const dateId = setInterval(() => getDate(), 1000);
    return function cleanup() {
      clearInterval(clockId);
      clearInterval(dateId);
    };
  }, []);
  return (
    <ClockWrapper>
      <DateSpan>{date}</DateSpan>
      <ClockSpan>{time}</ClockSpan>
    </ClockWrapper>
  );
}
export default Clock;

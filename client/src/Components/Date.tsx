import { useEffect, useState } from "react";
import styled from "styled-components";

const DateSpan = styled.span`
  color: white;
  font-size: 128px;
  font-weight: 600;
  width: 500px;
`;

function RealtimeDate() {
  const [date, setDate] = useState("");
  function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    setDate(`${hours}:${minutes}:${seconds}`);
  }
  useEffect(() => {
    const clockId = setInterval(getClock, 1000);
    return function cleanup() {
      clearInterval(clockId);
    };
  }, []);
  return <DateSpan>{date}</DateSpan>;
}
export default RealtimeDate;

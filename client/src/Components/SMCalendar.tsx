import { useState } from "react";
import Calendar from "react-calendar";

function SMCalendar() {
  const [calendarDate, setCalendarDate] = useState(new Date());

  return (
    <>
      <Calendar onChange={setCalendarDate} value={calendarDate} />
    </>
  );
}
export default SMCalendar;

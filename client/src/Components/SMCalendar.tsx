import { SetStateAction, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Wrapper } from "../assets/wrappers/SMCalendar";

function SMCalendar() {
  const [calendarDate, setCalendarDate] = useState(new Date());

  const onChange = (e: SetStateAction<Date>) => {
    setCalendarDate(e);
  };

  useEffect(() => {
    console.log(calendarDate);
  }, [calendarDate]);

  return (
    <Wrapper>
      <Calendar
        onChange={onChange}
        value={calendarDate}
        locale="en-EN"
        calendarType="US"
        formatDay={(locale, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
      />
    </Wrapper>
  );
}
export default SMCalendar;

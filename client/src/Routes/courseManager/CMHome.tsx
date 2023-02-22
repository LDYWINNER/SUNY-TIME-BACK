import Timetable from "react-timetable-events";

interface Event {
  id: number | string;
  name: string;
  startTime: Date;
  endTime: Date;
  type?: string;
  [key: string]: unknown;
}

interface Events {
  [day: string]: Event[];
}

const events: Events = {
  monday: [
    {
      id: 1,
      name: "Custom Event 1",
      type: "custom",
      startTime: new Date("2018-02-23T11:30:00"),
      endTime: new Date("2018-02-23T13:30:00"),
    },
  ],
  tuesday: [
    {
      id: 2,
      name: "Custom Event 2",
      type: "custom",
      startTime: new Date("2018-02-22T12:30:00"),
      endTime: new Date("2018-02-22T14:30:00"),
    },
    {
      id: 3,
      name: "Custom Event 3",
      type: "custom",
      startTime: new Date("2018-02-22T16:30:00"),
      endTime: new Date("2018-02-22T18:45:00"),
    },
  ],
  wednesday: [],
  thursday: [],
  friday: [],
};

function CMHome() {
  return (
    <>
      <Timetable events={events} style={{ height: "500px" }} />
    </>
  );
}
export default CMHome;

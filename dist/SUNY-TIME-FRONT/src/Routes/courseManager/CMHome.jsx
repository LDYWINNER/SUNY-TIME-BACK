"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CMHome_1 = require("../../assets/wrappers/CMHome");
const events = {
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
    // <Wrapper>
    //   <Col>
    //     <Timetable
    //       events={events}
    //       style={{ height: "40rem", width: "30rem" }}
    //     />
    //   </Col>
    //   <Col></Col>
    <CMHome_1.Temp>
      <h1>Coming Soon...</h1>
    </CMHome_1.Temp>
    // </Wrapper>
    );
}
exports.default = CMHome;

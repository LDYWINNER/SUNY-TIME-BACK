"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const assets_1 = require("../assets/assets");
const Components_1 = require("../Components");
const ScheduleManager_1 = require("../assets/wrappers/ScheduleManager");
function ScheduleManager() {
    const [bgImage, setbgImage] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        setbgImage(assets_1.bgImages[Math.floor(Math.random() * assets_1.bgImages.length)]);
    }, [bgImage]);
    return (<ScheduleManager_1.Wrapper bgImage={bgImage}>
      <ScheduleManager_1.Main>
        <Components_1.SMCalendar />
        <Components_1.ToDo />
      </ScheduleManager_1.Main>
    </ScheduleManager_1.Wrapper>);
}
exports.default = ScheduleManager;

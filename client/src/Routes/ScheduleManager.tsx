import { useEffect, useState } from "react";
import { bgImages } from "../assets/assets";
import { ToDo, SMCalendar } from "../Components";
import { Wrapper, Main } from "../assets/wrappers/ScheduleManager";

function ScheduleManager() {
  const [bgImage, setbgImage] = useState("");

  useEffect(() => {
    setbgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
  }, [bgImage]);

  return (
    <Wrapper bgImage={bgImage}>
      <Main>
        <SMCalendar />
        <ToDo />
      </Main>
    </Wrapper>
  );
}
export default ScheduleManager;

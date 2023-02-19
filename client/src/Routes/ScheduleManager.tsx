import { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/ScheduleManager";
import { bgImages } from "../assets/assets";

function ScheduleManager() {
  const [bgImage, setbgImage] = useState("");

  useEffect(() => {
    setbgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
  }, [bgImage]);

  return <Wrapper bgImage={bgImage}>Schedule Manager</Wrapper>;
}
export default ScheduleManager;

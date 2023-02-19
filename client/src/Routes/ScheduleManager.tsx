import { useEffect, useState } from "react";
import { Header } from "../Components";
import Wrapper from "../assets/wrappers/ScheduleManager";
import { bgImages } from "../assets/assets";

function ScheduleManager() {
  const [bgImage, setbgImage] = useState("");

  useEffect(() => {
    setbgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
  }, [bgImage]);

  return (
    <>
      <Header />
      <Wrapper bgImage={bgImage}>Schedule Manager</Wrapper>
    </>
  );
}
export default ScheduleManager;

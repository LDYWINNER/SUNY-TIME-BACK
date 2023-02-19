import { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/CourseManager";
import { bgImages } from "../assets/assets";

function CourseManager() {
  const [bgImage, setbgImage] = useState("");

  useEffect(() => {
    setbgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
  }, [bgImage]);

  return <Wrapper bgImage={bgImage}>Course Manager</Wrapper>;
}
export default CourseManager;

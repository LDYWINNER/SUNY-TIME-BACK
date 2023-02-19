import { useEffect, useState } from "react";
import { Header } from "../Components";
import Wrapper from "../assets/wrappers/Info";
import { bgImages } from "../assets/assets";

function Info() {
  const [bgImage, setbgImage] = useState("");

  useEffect(() => {
    setbgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
  }, [bgImage]);

  return (
    <>
      <Header />
      <Wrapper bgImage={bgImage}>Info</Wrapper>
    </>
  );
}
export default Info;

import { useEffect, useState } from "react";
import styled from "styled-components";
import img from "../assets/final.svg";

const bgImages = [
  "https://www.studyinkorea.go.kr/file/imgpreview.do?filename=EI_DATA_FILE201603290529569960_B.jpg&fileStorePath=univStorePath",
  "https://www.stonybrook.edu/commcms/studyabroad/_images/outgoing-banner-images/all-year-website-photos/korea/suny-korea-banner-1.png",
];

const Wrapper = styled.div<{ bgImage: string }>`
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  padding-bottom: 200px;
  height: 100%;
  width: 100%;
  padding: 60px;
`;

const Main = styled.div`
  height: 100%;
  width: 80vh;
`;

const Img = styled.img`
  width: 400px;
  height: 400px;
`;

function Home() {
  const [bgImage, setbgImage] = useState("");
  const [date, setDate] = useState("");
  function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    setDate(`${hours}:${minutes}:${seconds}`);
  }
  useEffect(() => {
    setbgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
    const clockId = setInterval(getClock, 1000);
    return function cleanup() {
      clearInterval(clockId);
    };
  }, [bgImage]);
  return (
    <Wrapper bgImage={bgImage}>
      <Main>
        <Img src={img}></Img>
        <span>{date}</span>
      </Main>
    </Wrapper>
  );
}
export default Home;

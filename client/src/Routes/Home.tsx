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
  useEffect(() => {
    setbgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
    console.log(bgImage);
  }, [bgImage]);
  return (
    <Wrapper bgImage={bgImage}>
      <Main>
        <Img src={img}></Img>
      </Main>
    </Wrapper>
  );
}
export default Home;

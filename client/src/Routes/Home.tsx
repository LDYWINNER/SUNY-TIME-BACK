import styled from "styled-components";

const Wrapper = styled.div`
  background-image: url("https://www.stonybrook.edu/commcms/studyabroad/_images/outgoing-banner-images/all-year-website-photos/korea/suny-korea-banner-1.png");
  /* background-image: url("../assets/banner.png"); */
  background-size: cover;
  padding-bottom: 200px;
  height: 100%;
  width: 100%;
  padding: 60px;
`;

const Logo = styled.div`
  background-image: url("src/assets/TIME.png");
  width: 400px;
  height: 400px;
`;

const Img = styled.img`
  width: 400px;
  height: 400px;
`;

function Home() {
  return (
    <Wrapper>
      <Logo />
      <Img src="/client/src/assets/TIME.png"></Img>
    </Wrapper>
  );
}
export default Home;

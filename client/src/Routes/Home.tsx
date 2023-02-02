import { useEffect, useState } from "react";
import styled from "styled-components";
import img from "../assets/final.svg";
import { bgImages, quotes } from "../assets/assets";

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

const DateSpan = styled.span`
  color: white;
`;

const QuoteDiv = styled.div``;

const QuoteText = styled.span``;

const Author = styled.span``;

interface IQuote {
  quote: string;
  author: string;
}

function Home() {
  const [bgImage, setbgImage] = useState("");
  const [quote, setQuote] = useState<IQuote>();
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
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    const clockId = setInterval(getClock, 1000);
    return function cleanup() {
      clearInterval(clockId);
    };
  }, [bgImage]);
  return (
    <Wrapper bgImage={bgImage}>
      <Main>
        <Img src={img}></Img>
        <DateSpan>{date}</DateSpan>
        <QuoteDiv>
          <QuoteText>{quote?.quote}</QuoteText>
          <Author>{quote?.author}</Author>
        </QuoteDiv>
      </Main>
    </Wrapper>
  );
}
export default Home;

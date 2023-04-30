import { useEffect, useState } from "react";
import styled from "styled-components";
import { quotes } from "../assets/assets";

const QuoteDiv = styled.div`
  font-size: 1.6vw;
  font-weight: 500;
  font-family: "Bebas Neue", "Nanum Gothic", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const QuoteText = styled.span`
  margin-bottom: 2vh;
`;

const Author = styled.span``;

interface IQuote {
  quote: string;
  author: string;
}

function Quotes() {
  const [quote, setQuote] = useState<IQuote>();
  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);
  return (
    <QuoteDiv>
      <QuoteText>{quote?.quote}</QuoteText>
      <Author>{quote?.author}</Author>
    </QuoteDiv>
  );
}
export default Quotes;

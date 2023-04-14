import styled from "styled-components";

export const Wrapper = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 100px;
`;

export const Blocks = styled.div`
  height: 100%;
  width: 100%;
  margin: auto 5%;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(5, minmax(20%, 1fr));
  grid-template-rows: repeat(4, minmax(25%, 1fr));
`;

export const Logo = styled.div`
  background-color: white;
  grid-column: 1 / 3;
  display: flex;
  align-items: center;
`;

export const LogoItem = styled.img`
  height: 100%;
  width: 100%;
`;

export const STLogo = styled.img`
  display: block;
  margin: 0 auto;
  margin-bottom: 1.38rem;
  width: 100%;
`;

export const Block = styled.div`
  background-color: teal;
`;

export const BigBlock = styled.div`
  background-color: black;
  grid-column: -3 / -1;
`;

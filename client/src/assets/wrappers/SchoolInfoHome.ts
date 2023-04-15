import styled from "styled-components";

export const Wrapper = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 100px;
  .main-blue {
    background-color: ${(props) => props.theme.main.blue};
    color: ${(props) => props.theme.white.lighter};
    &:hover {
      background-color: ${(props) => props.theme.white.darker};
      color: ${(props) => props.theme.main.blue};
    }
  }
  .light-blue {
    background-color: ${(props) => props.theme.main.lightBlue};
    color: ${(props) => props.theme.white.darker};
    &:hover {
      background-color: ${(props) => props.theme.white.darker};
      color: ${(props) => props.theme.main.lightBlue};
    }
  }
  .etc {
    background-color: ${(props) => props.theme.white.darker};
    color: ${(props) => props.theme.main.blue};
    &:hover {
      background-color: ${(props) => props.theme.main.blue};
      color: ${(props) => props.theme.white.lighter};
    }
  }
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
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
`;

export const LogoItem = styled.img`
  height: 100%;
  width: 100%;
`;

export const STLogo = styled.img`
  width: 50%;
  height: 100%;
`;

export const Block = styled.div`
  background-color: teal;
  height: 100%;
  width: 100%;
`;

export const BigBlock = styled.div`
  background-color: black;
  grid-column: -3 / -1;
`;

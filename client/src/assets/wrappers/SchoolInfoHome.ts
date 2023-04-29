import styled from "styled-components";

export const Wrapper = styled.section`
  height: 110vh;
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 90px;
  padding-bottom: 50px;
  background-color: ${(props) => props.theme.bgColor.lighter};
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

  .big-block {
    grid-column: -3 / -1;
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

export const Block = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 5%;
  font-weight: 600;
  h4 {
    margin-top: 5%;
    margin-bottom: 5%;
  }
`;

export const CDCBlock = styled.div<{ bgImage: string }>`
  height: 100%;
  width: 100%;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  color: ${(props) => props.theme.main.blue};
  padding-top: 5%;
  padding-left: 2%;
  font-weight: 600;

  div {
    width: 38%;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.white.darker};
    border-radius: 10px;
    h4 {
      margin-left: 2%;
      margin-right: 2%;
    }
    &:hover {
      background-color: ${(props) => props.theme.main.lightBlue};
    }
  }
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

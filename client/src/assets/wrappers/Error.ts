import styled from "styled-components";

const Wrapper = styled.main`
  text-align: center;
  img {
    max-width: 50vw;
    display: block;
    margin-bottom: 2rem;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    font-size: 36px;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  p,
  a {
    font-size: 24px;
    font-weight: 300;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.white.darker};
  }
  a {
    color: ${(props) => props.theme.white.darker};
    text-decoration: underline;
    text-transform: capitalize;
  }
`;

export default Wrapper;

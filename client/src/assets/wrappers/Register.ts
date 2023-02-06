import styled from "styled-components";

export const Wrapper = styled.section<{ bgImage: string }>`
  font-family: "Bebas Neue", cursive;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  display: grid;
  align-items: center;
  .form {
    width: max(400px, 30vw);
    border-top: 10px solid ${(props) => props.theme.main.blue};
    background-color: rgba(255, 255, 255, 0.5);
  }

  h3 {
    text-align: center;
    color: ${(props) => props.theme.main.blue};
    font-size: max(40px, 4.5vh);
    font-weight: 500;
    margin-bottom: 1rem;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
    font-size: max(20px, 2.3vh);
    color: ${(props) => props.theme.black.lighter};
  }
  label {
    font-size: max(24px, 2.5vh);
    color: ${(props) => props.theme.main.blue};
  }
  .btn {
    font-family: "Bebas Neue", cursive;
    font-size: max(20px, 2.2vh);
    margin-top: 1rem;
    background-color: ${(props) => props.theme.main.blue};
  }
  .member-btn {
    font-family: "Bebas Neue", cursive;
    background: transparent;
    border: transparent;
    color: ${(props) => props.theme.main.blue};
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
    font-size: max(20px, 2.3vh);
  }
`;

export const Logo = styled.img`
  display: block;
  margin: 0 auto;
  margin-bottom: 1.38rem;
  width: 100%;
`;

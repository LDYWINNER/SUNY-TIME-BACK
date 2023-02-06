import styled from "styled-components";

export const Wrapper = styled.section<{ bgImage: string }>`
  font-family: "Bebas Neue", cursive;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  display: grid;
  align-items: center;
  .form {
    max-width: 400px;
    border-top: 10px solid ${(props) => props.theme.main.blue};
    background-color: rgba(255, 255, 255, 0.5);
  }

  h3 {
    text-align: center;
    color: ${(props) => props.theme.main.blue};
    font-size: 4.5vh;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  label {
    font-size: 2.5vh;
    color: ${(props) => props.theme.main.blue};
  }
  .btn {
    font-family: "Bebas Neue", cursive;
    font-size: 2vh;
    margin-top: 1rem;
    background-color: ${(props) => props.theme.main.blue};
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;

export const Logo = styled.img`
  display: block;
  margin: 0 auto;
  margin-bottom: 1.38rem;
  width: 100%;
`;

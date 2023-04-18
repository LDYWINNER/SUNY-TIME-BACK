import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/images/navbar_logo.svg";

const Wrapper = styled.div`
  background-color: black;
  color: white;
  width: 100%;
  height: 200px;
  padding-top: 20px;
  display: flex;
  align-items: flex-start;
  padding-left: 10px;
`;

const Logo = styled.img`
  display: block;
  width: 15%;
`;

const Content = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  font-weight: 500;
  margin-left: 80px;
  margin-top: 10px;
  a {
    margin-bottom: 10px;
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <Logo src={logo} alt="sunytime" className="logo" />
      <Content>
        <Link to="">
          <span>FAQ</span>
        </Link>
        <Link to="">
          <span>Contact</span>
        </Link>
        <Link to="">
          <span>Feedback</span>
        </Link>
      </Content>
    </Wrapper>
  );
};

export default Footer;

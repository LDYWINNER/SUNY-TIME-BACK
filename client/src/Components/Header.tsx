import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect } from "react";
import logo from "../assets/navbar_logo.svg";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 18px;
  font-weight: 400;
  text-shadow: -1.5px 0 ${(props) => props.theme.main.blue},
    0 1.5px ${(props) => props.theme.main.blue},
    1.5px 0 ${(props) => props.theme.main.blue},
    0 -1.5px ${(props) => props.theme.main.blue};
  padding: 20px 60px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.img)`
  margin-right: 50px;
  width: 150px;
  height: 50px;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
};

function Header() {
  const homeMatch = useMatch("/");
  const infoMatch = useMatch("/school-info");
  const courseManagerMatch = useMatch("/course-manager");
  const scheduleManagerMatch = useMatch("/schedule-manager");
  const bulletinMatch = useMatch("/bulletin-board");
  const daangnMatch = useMatch("/daangn");
  const registerMatch = useMatch("/register");
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);
  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <Col>
        <Logo src={logo} />
        <Items>
          <Item>
            <Link to="/">Home {homeMatch && <Circle layoutId="circle" />}</Link>
          </Item>
          <Item>
            <Link to="/school-info">
              School Info {infoMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/schedule-manager">
              Schedule Manager{" "}
              {scheduleManagerMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/course-manager">
              Course Manager{" "}
              {courseManagerMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/bulletin-board">
              Bulletin Board {bulletinMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/daangn">
              Daangn {daangnMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Item>
          <Link to="/register">
            Login / Register {registerMatch && <Circle layoutId="circle" />}
          </Link>
        </Item>
      </Col>
    </Nav>
  );
}

export default Header;

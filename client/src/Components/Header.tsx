import { Link, useMatch } from "react-router-dom";
import { useAnimation, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../assets/images/navbar_logo.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { globalCurrentState, isDarkAtom } from "../atoms";
import DarkModeToggleBtn from "react-dark-mode-toggle";
import {
  Nav,
  Col,
  Logo,
  Items,
  Item,
  Circle,
  navVariants,
} from "../assets/wrappers/Header";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";

function Header() {
  //route match
  const homeMatch = useMatch("/");
  const infoMatch = useMatch("/school-info");
  const courseManagerMatch = useMatch("/course-manager");
  const scheduleManagerMatch = useMatch("/schedule-manager");
  const bulletinMatch = useMatch("/bulletin");
  const daangnMatch = useMatch("/daangn");
  const registerMatch = useMatch("/register");
  //nav animation
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  //user checking
  const { user } = useRecoilValue(globalCurrentState);
  //logout toggle
  const [showLogout, setShowLogout] = useState(false);
  //light dark theme toggle
  const [isDark, setDarkAtom] = useRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

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
        <Link to="/">
          <Logo src={logo} alt="sunytime" />
        </Link>
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
            <Link to="/bulletin">
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
          <DarkModeToggleBtn
            onChange={toggleDarkAtom}
            checked={isDark}
            size={60}
          />
        </Item>
        {user ? (
          <div className="btn-container">
            <button
              type="button"
              className="btn"
              onClick={() => setShowLogout(!showLogout)}
            >
              <FaUserCircle />
              {user?.username}
              <FaCaretDown />
            </button>
            <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
              <button
                type="button"
                className="dropdown-btn"
                onClick={() => "your profile page"}
              >
                My Profile
              </button>
              <button
                type="button"
                className="dropdown-btn"
                onClick={() => "logout"}
              >
                logout
              </button>
            </div>
          </div>
        ) : (
          <Item>
            <Link to="/register">
              Login / Register {registerMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        )}
      </Col>
    </Nav>
  );
}

export default Header;

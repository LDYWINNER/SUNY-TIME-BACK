import { Link, useMatch, useNavigate } from "react-router-dom";
import { useAnimation, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../assets/images/navbar_logo.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  emailConfirmationState,
  globalCurrentState,
  isDarkAtom,
} from "../atoms";
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
import { removeUserFromLocalStorage } from "../utils";
import { Show, Hide, useDisclosure } from "@chakra-ui/react";
import SmallSidebar from "./SmallNavbar";
import UpdateUserModal from "./UpdateUserModal";

function Header() {
  const navigate = useNavigate();
  //route match
  const homeMatch = useMatch("/");
  const infoMatch = useMatch("/school-info/*");
  const courseManagerMatch = useMatch("/course-manager/*");
  const bulletinMatch = useMatch("/bulletin");
  const registerMatch = useMatch("/register");
  //no navigation if authNum < 3
  const { authNum } = useRecoilValue(emailConfirmationState);
  //nav animation
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  //logout toggle
  const [showLogout, setShowLogout] = useState(false);
  //light dark theme toggle
  const [isDark, setDarkAtom] = useRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev: boolean) => !prev);
  //logout user
  const [globalState, setGlobalCurrentState] =
    useRecoilState(globalCurrentState);
  const logoutUser = () => {
    setGlobalCurrentState((currentState) => {
      return {
        ...currentState,
        user: null,
        token: null,
      };
    });
    removeUserFromLocalStorage();
    navigate("/");
    window.location.reload();
  };
  //update user modal
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <Show breakpoint="(min-width: 1000px)">
          <Link to="/" className={authNum < 3 ? "disabled-link" : ""}>
            <Logo src={logo} alt="sunytime" />
          </Link>
          <Items>
            <Item>
              <Link to="/" className={authNum < 3 ? "disabled-link" : ""}>
                Home {homeMatch && <Circle layoutId="circle" />}
              </Link>
            </Item>
            <Item>
              <Link
                to="/school-info"
                className={authNum < 3 ? "disabled-link" : ""}
              >
                School Info {infoMatch && <Circle layoutId="circle" />}
              </Link>
            </Item>
            <Item>
              <Link
                to="/course-manager"
                className={authNum < 3 ? "disabled-link" : ""}
              >
                Course Manager{" "}
                {courseManagerMatch && <Circle layoutId="circle" />}
              </Link>
            </Item>
            <Item>
              <Link
                to="/bulletin"
                className={authNum < 3 ? "disabled-link" : ""}
              >
                Bulletin Board {bulletinMatch && <Circle layoutId="circle" />}
              </Link>
            </Item>
          </Items>
        </Show>
        <Hide breakpoint="(min-width: 1000px)">
          <SmallSidebar />
        </Hide>
      </Col>
      <Hide breakpoint="(min-width: 1000px)">
        <Col>
          <Link to="/">
            <Logo src={logo} alt="sunytime" />
          </Link>
        </Col>
      </Hide>
      <Show breakpoint="(min-width: 1000px)">
        <Col>
          <Item>
            <DarkModeToggleBtn
              onChange={toggleDarkAtom}
              checked={isDark}
              size={60}
            />
          </Item>
          {globalState.user ? (
            <div className="btn-container">
              <button
                type="button"
                className="btn"
                onClick={() => setShowLogout(!showLogout)}
              >
                <FaUserCircle />
                {globalState.user?.username}
                <FaCaretDown />
              </button>
              <div
                className={showLogout ? "dropdown show-dropdown" : "dropdown"}
              >
                <button type="button" className="dropdown-btn" onClick={onOpen}>
                  My Profile
                </button>
                <UpdateUserModal isOpen={isOpen} onClose={onClose} />

                <button
                  type="button"
                  className="dropdown-btn"
                  onClick={logoutUser}
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
      </Show>
      <Hide breakpoint="(min-width: 1000px)">
        <Col>
          <button
            type="button"
            className="btn"
            onClick={() => "send to update user page"}
          >
            <FaUserCircle />
          </button>
        </Col>
      </Hide>
    </Nav>
  );
}

export default Header;

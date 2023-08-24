"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const framer_motion_1 = require("framer-motion");
const react_1 = require("react");
const navbar_logo_svg_1 = __importDefault(require("../assets/images/navbar_logo.svg"));
const recoil_1 = require("recoil");
const atoms_1 = require("../atoms");
const react_dark_mode_toggle_1 = __importDefault(require("react-dark-mode-toggle"));
const Header_1 = require("../assets/wrappers/Header");
const fa_1 = require("react-icons/fa");
const utils_1 = require("../utils");
const react_2 = require("@chakra-ui/react");
const SmallNavbar_1 = __importDefault(require("./SmallNavbar"));
const UpdateUserModal_1 = __importDefault(require("./UpdateUserModal"));
function Header() {
    var _a;
    const navigate = (0, react_router_dom_1.useNavigate)();
    //route match
    const homeMatch = (0, react_router_dom_1.useMatch)("/");
    const infoMatch = (0, react_router_dom_1.useMatch)("/school-info/*");
    const courseManagerMatch = (0, react_router_dom_1.useMatch)("/course-manager/*");
    const bulletinMatch = (0, react_router_dom_1.useMatch)("/bulletin");
    const registerMatch = (0, react_router_dom_1.useMatch)("/register");
    //nav animation
    const navAnimation = (0, framer_motion_1.useAnimation)();
    const { scrollY } = (0, framer_motion_1.useScroll)();
    //logout toggle
    const [showLogout, setShowLogout] = (0, react_1.useState)(false);
    //light dark theme toggle
    const [isDark, setDarkAtom] = (0, recoil_1.useRecoilState)(atoms_1.isDarkAtom);
    const toggleDarkAtom = () => {
        setDarkAtom((prev) => !prev);
        localStorage.setItem("recoil-persist", JSON.stringify({
            isDark,
        }));
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };
    //logout user
    const [globalState, setGlobalCurrentState] = (0, recoil_1.useRecoilState)(atoms_1.globalCurrentState);
    const logoutUser = () => {
        setGlobalCurrentState((currentState) => {
            return Object.assign(Object.assign({}, currentState), { user: null, token: null });
        });
        (0, utils_1.removeUserFromLocalStorage)();
        localStorage.setItem("courseSubjSearchFilter", "AMS");
        localStorage.setItem("filterInstructor", "ALL");
        localStorage.setItem("filterSemester", "ALL");
        navigate("/");
        window.location.reload();
    };
    //update user modal
    const { isOpen, onOpen, onClose } = (0, react_2.useDisclosure)();
    const toast = (0, react_2.useToast)();
    const user = localStorage.getItem("user");
    (0, react_1.useEffect)(() => {
        scrollY.onChange(() => {
            if (scrollY.get() > 80) {
                navAnimation.start("scroll");
            }
            else {
                navAnimation.start("top");
            }
        });
    }, [scrollY, navAnimation]);
    return (<Header_1.Nav variants={Header_1.navVariants} animate={navAnimation} initial={"top"}>
      <Header_1.Col>
        <react_2.Show breakpoint="(min-width: 1000px)">
          <react_router_dom_1.Link to="/">
            <Header_1.Logo src={navbar_logo_svg_1.default} alt="sunytime"/>
          </react_router_dom_1.Link>
          <Header_1.Items>
            <Header_1.Item>
              <react_router_dom_1.Link to="/">
                Home {homeMatch && <Header_1.Circle layoutId="circle"/>}
              </react_router_dom_1.Link>
            </Header_1.Item>
            <Header_1.Item>
              <react_router_dom_1.Link to="/school-info">
                School Info {infoMatch && <Header_1.Circle layoutId="circle"/>}
              </react_router_dom_1.Link>
            </Header_1.Item>
            <Header_1.Item>
              <react_router_dom_1.Link to="/course-manager" onClick={() => {
            if (!user)
                toast({
                    title: "Authentication Warning!",
                    description: "You should register first to use this feature :(",
                    status: "warning",
                    duration: 9000,
                    isClosable: true,
                });
        }}>
                Course Manager{" "}
                {courseManagerMatch && <Header_1.Circle layoutId="circle"/>}
              </react_router_dom_1.Link>
            </Header_1.Item>
            <Header_1.Item>
              <react_router_dom_1.Link to="/bulletin" onClick={() => {
            var _a;
            if (!user)
                toast({
                    title: "Authentication Warning!",
                    description: "You should register first to use this feature :(",
                    status: "warning",
                    duration: 9000,
                    isClosable: true,
                });
            const courseManagerAccess = JSON.parse(localStorage.getItem("coursemanger-access"));
            if (((_a = globalState.user) === null || _a === void 0 ? void 0 : _a.courseReviewNum) < 3 &&
                courseManagerAccess) {
                localStorage.setItem("coursemanger-access", "false");
                return <react_router_dom_1.Navigate to="/course-review"/>;
            }
        }}>
                Bulletin Board {bulletinMatch && <Header_1.Circle layoutId="circle"/>}
              </react_router_dom_1.Link>
            </Header_1.Item>
          </Header_1.Items>
        </react_2.Show>
        <react_2.Hide breakpoint="(min-width: 1000px)">
          <SmallNavbar_1.default />
        </react_2.Hide>
      </Header_1.Col>
      <react_2.Hide breakpoint="(min-width: 1000px)">
        <Header_1.Col>
          <react_router_dom_1.Link to="/">
            <Header_1.Logo src={navbar_logo_svg_1.default} alt="sunytime"/>
          </react_router_dom_1.Link>
        </Header_1.Col>
      </react_2.Hide>
      <react_2.Show breakpoint="(min-width: 1000px)">
        <Header_1.Col>
          <Header_1.Item>
            <react_dark_mode_toggle_1.default onChange={toggleDarkAtom} checked={isDark} size={60}/>
          </Header_1.Item>
          {globalState.user ? (<div className="btn-container" style={{ minWidth: "10rem" }}>
              <button type="button" className="btn" onClick={() => setShowLogout(!showLogout)} style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
            }}>
                <div style={{
                display: "flex",
                alignItems: "center",
            }}>
                  <fa_1.FaUserCircle />
                  <h4 style={{
                marginLeft: "0.5rem",
            }}>
                    {(_a = globalState.user) === null || _a === void 0 ? void 0 : _a.username}
                  </h4>
                </div>
                <fa_1.FaCaretDown />
              </button>
              <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
                <button type="button" className="dropdown-btn" onClick={onOpen}>
                  Update Profile
                </button>
                <UpdateUserModal_1.default isOpen={isOpen} onClose={onClose}/>

                <button type="button" className="dropdown-btn" onClick={logoutUser}>
                  logout
                </button>
              </div>
            </div>) : (<Header_1.Item>
              <react_router_dom_1.Link to="/register">
                Login / Register {registerMatch && <Header_1.Circle layoutId="circle"/>}
              </react_router_dom_1.Link>
            </Header_1.Item>)}
        </Header_1.Col>
      </react_2.Show>
      <react_2.Hide breakpoint="(min-width: 1000px)">
        <Header_1.Col>
          <button type="button" className="btn" onClick={() => "send to update user page"}>
            <fa_1.FaUserCircle />
          </button>
        </Header_1.Col>
      </react_2.Hide>
    </Header_1.Nav>);
}
exports.default = Header;

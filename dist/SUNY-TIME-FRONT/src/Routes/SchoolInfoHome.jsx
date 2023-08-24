"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sunykoreacdc_png_1 = __importDefault(require("../assets/images/sunykoreacdc.png"));
const seawolf_jpeg_1 = __importDefault(require("../assets/images/seawolf.jpeg"));
const SchoolInfoHome_1 = require("../assets/wrappers/SchoolInfoHome");
const react_router_dom_1 = require("react-router-dom");
const tb_1 = require("react-icons/tb");
const io_1 = require("react-icons/io");
const io5_1 = require("react-icons/io5");
const gi_1 = require("react-icons/gi");
const fc_1 = require("react-icons/fc");
const tb_2 = require("react-icons/tb");
const fa_1 = require("react-icons/fa");
const bs_1 = require("react-icons/bs");
function SchoolInfoHome() {
    return (<SchoolInfoHome_1.Wrapper>
      <SchoolInfoHome_1.Blocks>
        <SchoolInfoHome_1.Logo>
          <react_router_dom_1.Link to="https://www.sunykorea.ac.kr/en/">
            <h1>SUNY KOREA</h1>
          </react_router_dom_1.Link>
        </SchoolInfoHome_1.Logo>
        <react_router_dom_1.Link to="https://www.sunykorea.ac.kr/en/html/sub03/030101.html">
          <SchoolInfoHome_1.Block className="light-blue">
            <tb_1.TbMathFunction size="24"/>
            <h4>Applied Mathematics and Statistics</h4>{" "}
          </SchoolInfoHome_1.Block>
        </react_router_dom_1.Link>
        <react_router_dom_1.Link to="https://www.sunykorea.ac.kr/en/html/sub03/030105.html">
          <SchoolInfoHome_1.Block className="main-blue">
            <io_1.IoMdBusiness size="24"/>
            <h4>Business Management</h4>
          </SchoolInfoHome_1.Block>
        </react_router_dom_1.Link>
        <react_router_dom_1.Link to="https://www.sunykorea.ac.kr/en/html/sub03/030104.html">
          <SchoolInfoHome_1.Block className="light-blue">
            <io5_1.IoCodeSlash size="24"/>
            <h4>Computer Science</h4>
          </SchoolInfoHome_1.Block>
        </react_router_dom_1.Link>

        <SchoolInfoHome_1.Logo>
          <react_router_dom_1.Link to="https://www.stonybrook.edu/">
            <SchoolInfoHome_1.LogoItem src={seawolf_jpeg_1.default} alt="seawolf" className="logo"/>
          </react_router_dom_1.Link>
        </SchoolInfoHome_1.Logo>
        <react_router_dom_1.Link to="https://www.sunykorea.ac.kr/en/html/sub03/030106.html">
          <SchoolInfoHome_1.Block className="main-blue">
            <gi_1.GiElectricalResistance size="24"/>
            <h4>Electrical and Computer Engineering</h4>
          </SchoolInfoHome_1.Block>
        </react_router_dom_1.Link>
        <react_router_dom_1.Link to="https://www.sunykorea.ac.kr/en/html/sub03/030102.html">
          <SchoolInfoHome_1.Block className="light-blue">
            <gi_1.GiMechanicGarage size="24"/>
            <h4>Mechanical Engineering</h4>
          </SchoolInfoHome_1.Block>
        </react_router_dom_1.Link>
        <react_router_dom_1.Link to="https://www.sunykorea.ac.kr/en/html/sub03/030103.html">
          <SchoolInfoHome_1.Block className="etc">
            <fc_1.FcConferenceCall size="24"/>
            <h4>Technology and Society</h4>
          </SchoolInfoHome_1.Block>
        </react_router_dom_1.Link>

        <react_router_dom_1.Link to="https://www.sunykorea.ac.kr/en/html/sub05/0505.html">
          <SchoolInfoHome_1.Block className="light-blue">
            <h4>SUNY Korea Monthly Schedule</h4>
            <bs_1.BsFillCalendar2WeekFill size="30"/>
          </SchoolInfoHome_1.Block>
        </react_router_dom_1.Link>
        <react_router_dom_1.Link to="https://www.sunykorea.ac.kr/en/html/sub03/030501.html">
          <SchoolInfoHome_1.Block className="main-blue">
            <h4>Academic Calendar & Course List</h4>
            <bs_1.BsFillCalendar2WeekFill size="30"/>
          </SchoolInfoHome_1.Block>
        </react_router_dom_1.Link>
        <react_router_dom_1.Link to="https://www.sunykorea.ac.kr/en/html/sub03/030503.html">
          <SchoolInfoHome_1.Block className="etc">
            <h4>Scholarship</h4>
            <tb_2.TbReportMoney size="40"/>
          </SchoolInfoHome_1.Block>
        </react_router_dom_1.Link>
        <react_router_dom_1.Link to="https://www.sunykorea.ac.kr/en/html/sub03/030505.html">
          <SchoolInfoHome_1.Block className="main-blue">
            <h4>Forms</h4>
            <fa_1.FaWpforms size="30"/>
          </SchoolInfoHome_1.Block>
        </react_router_dom_1.Link>
        <react_router_dom_1.Link to="https://www.sunykorea.ac.kr/en/html/sub03/0303.html">
          <SchoolInfoHome_1.Block className="light-blue">
            <h4>Faculty of Sciences and Humanities</h4>
          </SchoolInfoHome_1.Block>
        </react_router_dom_1.Link>

        <react_router_dom_1.Link to="https://www.sunykorea.ac.kr/en/html/sub04/040403.html">
          <SchoolInfoHome_1.Block className="etc">
            <h4>Career Services Opportunities</h4>
          </SchoolInfoHome_1.Block>
        </react_router_dom_1.Link>
        <react_router_dom_1.Link to="https://www.sunykorea.ac.kr/en/html/sub04/040404.html">
          <SchoolInfoHome_1.Block className="light-blue">
            <h4>Career Events</h4>
          </SchoolInfoHome_1.Block>
        </react_router_dom_1.Link>
        <react_router_dom_1.Link to="https://www.sunykorea.ac.kr/en/html/sub04/040405.html">
          <SchoolInfoHome_1.Block className="main-blue">
            <h4>Career Resources</h4>
          </SchoolInfoHome_1.Block>
        </react_router_dom_1.Link>

        <react_router_dom_1.Link to="https://sunykoreacdc.youcanbook.me/" className="big-block">
          <SchoolInfoHome_1.CDCBlock bgImage={sunykoreacdc_png_1.default}>
            <div>
              <h4>Book meeting with CDC</h4>
              <bs_1.BsFillArrowRightCircleFill />
            </div>
          </SchoolInfoHome_1.CDCBlock>
        </react_router_dom_1.Link>
      </SchoolInfoHome_1.Blocks>
    </SchoolInfoHome_1.Wrapper>);
}
exports.default = SchoolInfoHome;

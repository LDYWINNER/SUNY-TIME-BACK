import cdc from "../assets/images/sunykoreacdc.png";
import seawolf from "../assets/images/seawolf.jpeg";
import {
  Wrapper,
  Blocks,
  Logo,
  LogoItem,
  Block,
  CDCBlock,
} from "../assets/wrappers/SchoolInfoHome";
import { Link } from "react-router-dom";
import { TbMathFunction } from "react-icons/tb";
import { IoMdBusiness } from "react-icons/io";
import { IoCodeSlash } from "react-icons/io5";
import { GiElectricalResistance, GiMechanicGarage } from "react-icons/gi";
import { FcConferenceCall } from "react-icons/fc";
import { TbReportMoney } from "react-icons/tb";
import { FaWpforms } from "react-icons/fa";
import {
  BsFillCalendar2WeekFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

function SchoolInfoHome() {
  return (
    <Wrapper>
      <Blocks>
        <Logo>
          <Link to="https://www.sunykorea.ac.kr/en/">
            <h1>SUNY KOREA</h1>
          </Link>
        </Logo>
        <Link to="https://www.sunykorea.ac.kr/en/html/sub03/030101.html">
          <Block className="light-blue">
            <TbMathFunction size="24" />
            <h4>Applied Mathematics and Statistics</h4>{" "}
          </Block>
        </Link>
        <Link to="https://www.sunykorea.ac.kr/en/html/sub03/030105.html">
          <Block className="main-blue">
            <IoMdBusiness size="24" />
            <h4>Business Management</h4>
          </Block>
        </Link>
        <Link to="https://www.sunykorea.ac.kr/en/html/sub03/030104.html">
          <Block className="light-blue">
            <IoCodeSlash size="24" />
            <h4>Computer Science</h4>
          </Block>
        </Link>

        <Logo>
          <Link to="https://www.stonybrook.edu/">
            <LogoItem src={seawolf} alt="seawolf" className="logo" />
          </Link>
        </Logo>
        <Link to="https://www.sunykorea.ac.kr/en/html/sub03/030106.html">
          <Block className="main-blue">
            <GiElectricalResistance size="24" />
            <h4>Electrical and Computer Engineering</h4>
          </Block>
        </Link>
        <Link to="https://www.sunykorea.ac.kr/en/html/sub03/030102.html">
          <Block className="light-blue">
            <GiMechanicGarage size="24" />
            <h4>Mechanical Engineering</h4>
          </Block>
        </Link>
        <Link to="https://www.sunykorea.ac.kr/en/html/sub03/030103.html">
          <Block className="etc">
            <FcConferenceCall size="24" />
            <h4>Technology and Society</h4>
          </Block>
        </Link>

        <Link to="https://www.sunykorea.ac.kr/en/html/sub05/0505.html">
          <Block className="light-blue">
            <h4>SUNY Korea Monthly Schedule</h4>
            <BsFillCalendar2WeekFill size="30" />
          </Block>
        </Link>
        <Link to="https://www.sunykorea.ac.kr/en/html/sub03/030501.html">
          <Block className="main-blue">
            <h4>Academic Calendar & Course List</h4>
            <BsFillCalendar2WeekFill size="30" />
          </Block>
        </Link>
        <Link to="https://www.sunykorea.ac.kr/en/html/sub03/030503.html">
          <Block className="etc">
            <h4>Scholarship</h4>
            <TbReportMoney size="40" />
          </Block>
        </Link>
        <Link to="https://www.sunykorea.ac.kr/en/html/sub03/030505.html">
          <Block className="main-blue">
            <h4>Forms</h4>
            <FaWpforms size="30" />
          </Block>
        </Link>
        <Link to="https://www.sunykorea.ac.kr/en/html/sub03/0303.html">
          <Block className="light-blue">
            <h4>Faculty of Sciences and Humanities</h4>
          </Block>
        </Link>

        <Link to="https://www.sunykorea.ac.kr/en/html/sub04/040403.html">
          <Block className="etc">
            <h4>Career Services Opportunities</h4>
          </Block>
        </Link>
        <Link to="https://www.sunykorea.ac.kr/en/html/sub04/040404.html">
          <Block className="light-blue">
            <h4>Career Events</h4>
          </Block>
        </Link>
        <Link to="https://www.sunykorea.ac.kr/en/html/sub04/040405.html">
          <Block className="main-blue">
            <h4>Career Resources</h4>
          </Block>
        </Link>

        <Link to="https://sunykoreacdc.youcanbook.me/" className="big-block">
          <CDCBlock bgImage={cdc}>
            <div>
              <h4>Book meeting with CDC</h4>
              <BsFillArrowRightCircleFill />
            </div>
          </CDCBlock>
        </Link>
      </Blocks>
    </Wrapper>
  );
}
export default SchoolInfoHome;

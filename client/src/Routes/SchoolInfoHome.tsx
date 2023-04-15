import sunykorea from "../assets/images/sunykorea.png";
import seawolf from "../assets/images/seawolf.jpeg";
import {
  Wrapper,
  Blocks,
  Logo,
  LogoItem,
  Block,
  BigBlock,
  STLogo,
} from "../assets/wrappers/SchoolInfoHome";
import { Link } from "react-router-dom";
import { TbMathFunction } from "react-icons/tb";
import { IoMdBusiness } from "react-icons/io";
import { IoCodeSlash } from "react-icons/io5";
import { GiElectricalResistance, GiMechanicGarage } from "react-icons/gi";
import { FcConferenceCall } from "react-icons/fc";
import { TbReportMoney } from "react-icons/tb";
import { FaWpforms } from "react-icons/fa";
import { BsFillCalendar2WeekFill } from "react-icons/bs";

function SchoolInfoHome() {
  return (
    <Wrapper>
      <Blocks>
        <Logo>
          <Link to="https://www.sunykorea.ac.kr/en/">
            <STLogo src={sunykorea} alt="sunytime" className="logo" />
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

        <Link to="">
          <Block className="light-blue">
            <h4>Faculty Senators</h4>
          </Block>
        </Link>
        <Link to="">
          <Block className="main-blue">
            <h4>Academic Calendars</h4>
            <BsFillCalendar2WeekFill size="30" />
          </Block>
        </Link>
        <Link to="">
          <Block className="etc">
            <h4>Scholarship</h4>
            <TbReportMoney size="40" />
          </Block>
        </Link>
        <Link to="">
          <Block className="main-blue">
            <h4>Forms</h4>
            <FaWpforms size="30" />
          </Block>
        </Link>
        <Link to="">
          <Block className="light-blue">
            <h4>Faculty of Sciences and Humanities</h4>
          </Block>
        </Link>

        <Link to="">
          <Block className="etc">
            <h4>Career Services Opportunities</h4>
          </Block>
        </Link>
        <Link to="">
          <Block className="light-blue">
            <h4>Career Events</h4>
          </Block>
        </Link>
        <Link to="">
          <Block className="main-blue">
            <h4>Career Resources</h4>
          </Block>
        </Link>

        <BigBlock></BigBlock>
      </Blocks>
    </Wrapper>
  );
}
export default SchoolInfoHome;

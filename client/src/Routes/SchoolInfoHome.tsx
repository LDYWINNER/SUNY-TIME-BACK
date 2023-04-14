import logo from "../assets/images/navbar_logo.svg";
import seawolf from "../assets/images/seawolf.jpeg";
import {
  Wrapper,
  Blocks,
  Logo,
  SBULogo,
  Block,
  BigBlock,
  STLogo,
} from "../assets/wrappers/SchoolInfoHome";

function SchoolInfoHome() {
  return (
    <Wrapper>
      <Blocks>
        <Logo>
          <STLogo src={logo} alt="sunytime" className="logo" />
        </Logo>
        <Block></Block>
        <Block></Block>
        <Block></Block>

        <SBULogo bgImage={seawolf} />
        <Block></Block>
        <Block></Block>
        <Block></Block>

        <Block></Block>
        <Block></Block>
        <Block></Block>
        <Block></Block>
        <Block></Block>

        <Block></Block>
        <Block></Block>
        <Block></Block>

        <BigBlock></BigBlock>
      </Blocks>
    </Wrapper>
  );
}
export default SchoolInfoHome;

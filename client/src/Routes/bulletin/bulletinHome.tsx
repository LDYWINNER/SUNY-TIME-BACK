import { BsPencilSquare } from "react-icons/bs";
import {
  Wrapper,
  FilterRow,
  TitleRow,
  Title,
  BulletinPostBtn,
} from "../../assets/wrappers/BulletinHome";

function BulletinHome() {
  return (
    <Wrapper>
      <FilterRow>
        <h1>filters</h1>
      </FilterRow>
      <TitleRow>
        <Title>Board</Title>
        <BulletinPostBtn
          type="button"
          className="btn"
          onClick={() => "send to update user page"}
        >
          <BsPencilSquare />
        </BulletinPostBtn>
      </TitleRow>
    </Wrapper>
  );
}
export default BulletinHome;

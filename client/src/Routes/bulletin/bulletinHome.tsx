import {
  Wrapper,
  FilterRow,
  TitleRow,
  Title,
  BulletinPostBtn,
} from "../../assets/wrappers/BulletinHome";
import { BsPencilSquare } from "react-icons/bs";
import { BulletinPostPopOverContent } from "../../Components";
import { Popover, PopoverTrigger } from "@chakra-ui/react";

function BulletinHome() {
  return (
    <Wrapper>
      <FilterRow>
        <h1>filters</h1>
      </FilterRow>
      <TitleRow>
        <Title>Board</Title>
        <Popover closeOnBlur={false} closeOnEsc={false}>
          <PopoverTrigger>
            <BulletinPostBtn type="button" className="btn">
              <BsPencilSquare />
            </BulletinPostBtn>
          </PopoverTrigger>
          <BulletinPostPopOverContent />
        </Popover>
      </TitleRow>
    </Wrapper>
  );
}
export default BulletinHome;

import { Popover, PopoverTrigger } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { globalCurrentState } from "../../atoms";
import { BsPencilSquare } from "react-icons/bs";
import {
  CourseBulletinAllPosts,
  CourseBulletinPopOver,
  CourseBulletinPagination,
} from "../../Components";
import { Wrapper, BulletinPostBtn } from "../../assets/wrappers/CourseBulletin";

const CourseBulletin = () => {
  const { bulletinNumOfPages } = useRecoilValue(globalCurrentState);

  return (
    <Wrapper>
      <Popover closeOnBlur={false} closeOnEsc={false}>
        <PopoverTrigger>
          <BulletinPostBtn type="button" className="btn">
            <BsPencilSquare />
          </BulletinPostBtn>
        </PopoverTrigger>
        <CourseBulletinPopOver />
      </Popover>
      <CourseBulletinAllPosts />
      {bulletinNumOfPages > 1 && <CourseBulletinPagination />}
    </Wrapper>
  );
};

export default CourseBulletin;

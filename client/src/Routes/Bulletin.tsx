import { useEffect } from "react";
import {
  Wrapper,
  Main,
  MainContent,
  SubContent,
  FilterRow,
  TitleRow,
  Title,
  BulletinPostBtn,
} from "../assets/wrappers/Bulletin";
import { bgImages } from "../assets/assets";
import { BsPencilSquare } from "react-icons/bs";
import {
  BulletinAllPosts,
  BulletinPostPopOverContent,
  BulletinSearch,
  BulletinPagination,
  Announcement,
} from "../Components";
import { Popover, PopoverTrigger } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  singlePageBgImageState,
  bulletinSearchState,
  globalCurrentState,
} from "../atoms";

const Bulletin = () => {
  const [bgImage, setBgImage] = useRecoilState(singlePageBgImageState);
  const { bulletinNumOfPages } = useRecoilValue(globalCurrentState);
  const { boardFilter } = useRecoilValue(bulletinSearchState);
  let whichBoard = "";
  if (boardFilter === "Free") {
    whichBoard = "자유게시판";
  } else if (boardFilter === "Secret") {
    whichBoard = "비밀게시판";
  } else if (boardFilter === "Freshmen") {
    whichBoard = "새내기게시판";
  } else if (boardFilter === "courseRegister") {
    whichBoard = "수강신청게시판";
  } else if (boardFilter === "Promotion") {
    whichBoard = "홍보게시판";
  } else if (boardFilter === "Club") {
    whichBoard = "동아리게시판";
  } else if (boardFilter === "Sbu") {
    whichBoard = "본교게시판";
  }

  useEffect(() => {
    setBgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
  }, [bgImage, setBgImage]);

  return (
    <Wrapper bgImage={bgImage}>
      <Main>
        <MainContent>
          <FilterRow>
            <BulletinSearch />
          </FilterRow>
          <TitleRow>
            <Title>{whichBoard}</Title>
            <Popover closeOnBlur={false} closeOnEsc={false}>
              <PopoverTrigger>
                <BulletinPostBtn type="button" className="btn">
                  <BsPencilSquare />
                </BulletinPostBtn>
              </PopoverTrigger>
              <BulletinPostPopOverContent />
            </Popover>
          </TitleRow>
          <BulletinAllPosts />
          {bulletinNumOfPages > 1 && <BulletinPagination />}
        </MainContent>
        <SubContent>
          <Announcement />
        </SubContent>
      </Main>
    </Wrapper>
  );
};

export default Bulletin;

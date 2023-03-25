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
} from "../Components";
import { Popover, PopoverTrigger } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  singlePageBgImageState,
  bulletinSearchState,
  globalCurrentState,
} from "../atoms";
import { BulletinPagination } from "../Components";

const Bulletin = () => {
  const [bgImage, setBgImage] = useRecoilState(singlePageBgImageState);
  const { bulletinNumOfPages } = useRecoilValue(globalCurrentState);
  const { boardFilter } = useRecoilValue(bulletinSearchState);

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
            <Title>{boardFilter} Board</Title>
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
        <SubContent></SubContent>
      </Main>
    </Wrapper>
  );
};

export default Bulletin;

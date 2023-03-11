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
import { useRecoilState } from "recoil";
import { bulletinBgImageState } from "../atoms";

const Bulletin = () => {
  const [bgImage, setBgImage] = useRecoilState(bulletinBgImageState);

  useEffect(() => {
    setBgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
  }, [bgImage, setBgImage]);

  return (
    <Wrapper bgImage={bgImage}>
      <Main>
        <MainContent>
          <FilterRow>
            <h1>filters</h1>
            <BulletinSearch />
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
          <BulletinAllPosts />
        </MainContent>
        <SubContent></SubContent>
      </Main>
    </Wrapper>
  );
};

export default Bulletin;

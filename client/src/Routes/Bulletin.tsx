import { useState, useEffect, useCallback } from "react";
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
import { BulletinPostPopOverContent } from "../Components";
import { Popover, PopoverTrigger } from "@chakra-ui/react";
import { authFetch } from "../api";
import { useRecoilState } from "recoil";
import { globalCurrentState } from "../atoms";
import { removeUserFromLocalStorage } from "../utils";

const Bulletin = () => {
  const [bgImage, setbgImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [globalState, setGlobalCurrentState] =
    useRecoilState(globalCurrentState);

  const logoutUser = useCallback(() => {
    setGlobalCurrentState((currentState) => {
      return {
        ...currentState,
        user: null,
        token: null,
      };
    });
    removeUserFromLocalStorage();
    window.location.reload();
  }, [setGlobalCurrentState]);

  //getting the posts
  const getPost = useCallback(async () => {
    let url = `bulletin`;

    setIsLoading(true);
    try {
      const { data } = await authFetch(url);
      const { bulletinAllPosts, bulletinTotalPosts, bulletinNumOfPages } = data;
      console.log(data);

      setIsLoading(false);
    } catch (error: any) {
      console.log(error.response);
      //log user out
      logoutUser();
    }
  }, [logoutUser]);

  useEffect(() => {
    setbgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
    getPost();
  }, [bgImage, getPost]);

  return (
    <Wrapper bgImage={bgImage}>
      <Main>
        <MainContent>
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
          <div></div>
        </MainContent>
        <SubContent></SubContent>
      </Main>
    </Wrapper>
  );
};

export default Bulletin;

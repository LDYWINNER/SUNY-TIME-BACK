import { useState, useEffect, useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { bulletinSearchState, globalCurrentState, isDarkAtom } from "../atoms";
import { removeUserFromLocalStorage } from "../utils";
import { authFetch } from "../api";
import Loading from "./Loading";
import {
  Wrapper,
  Post,
  Row,
  Container,
  User,
  Icon,
} from "../assets/wrappers/BulletinAllPosts";
import { Link } from "react-router-dom";
import moment from "moment";
import { AiOutlineLike } from "react-icons/ai";

interface IPostComment {
  text: string;
  likes: [string];
  createdBy: string;
  createdByUsername: string;
  anonymity: boolean;
  createdAt: string;
  _id: string;
}

interface IPost {
  comments: [IPostComment];
  anonymity: Boolean;
  content: string;
  createdAt: string;
  createdBy: string;
  createdByUsername: string;
  likes: [string];
  board: string;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

const BulletinAllPosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [globalState, setGlobalCurrentState] =
    useRecoilState(globalCurrentState);
  const { boardFilter, searchKeyword } = useRecoilValue(bulletinSearchState);
  const isDark = useRecoilValue(isDarkAtom);

  const logoutUser = useCallback(() => {
    setGlobalCurrentState((currentState) => {
      return {
        ...currentState,
        user: null,
        token: null,
      };
    });
    removeUserFromLocalStorage();
    localStorage.setItem("courseSubjSearchFilter", "AMS");
    localStorage.setItem("filterInstructor", "ALL");
    window.location.reload();
  }, [setGlobalCurrentState]);

  //getting the posts
  const getPost = useCallback(async () => {
    let url = `bulletin?page=${globalState.bulletinPage}&board=${boardFilter}`;

    if (searchKeyword) {
      url = url + `&search=${searchKeyword}`;
    }

    setIsLoading(true);
    try {
      const { data } = await authFetch(url);
      const { bulletinAllPosts, bulletinTotalPosts, bulletinNumOfPages } = data;
      setGlobalCurrentState((currentState) => {
        return {
          ...currentState,
          bulletinAllPosts,
          bulletinTotalPosts,
          bulletinNumOfPages,
        };
      });
      // console.log(data);

      setIsLoading(false);
    } catch (error: any) {
      // console.log(error.response);
      // log user out
      logoutUser();
    }
  }, [
    globalState.bulletinPage,
    boardFilter,
    logoutUser,
    searchKeyword,
    setGlobalCurrentState,
  ]);

  useEffect(() => {
    getPost();
  }, [getPost, boardFilter, searchKeyword, globalState.bulletinPage]);

  if (isLoading) {
    return <Loading center />;
  }
  if (globalState.bulletinAllPosts.length === 0) {
    return (
      <Wrapper>
        <h2>No posts to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {globalState.bulletinAllPosts.map((post: IPost) => {
        return (
          <Post key={post._id}>
            <Link to={`/bulletin/${post._id}`} state={{ id: post._id }}>
              <Container>
                <Row>
                  <h2>{post.title}</h2>
                  <User>
                    {post.anonymity ? "익명" : post.createdByUsername}
                  </User>
                </Row>
                <h4>{post.content}</h4>
              </Container>
              <Row>
                <h5>{moment(post.createdAt).format("MMMM Do, h:mm a")}</h5>
                <Icon>
                  <Row style={{ color: isDark ? "yellow" : "blue" }}>
                    <AiOutlineLike />
                    {post.likes.length}
                  </Row>
                </Icon>
              </Row>
            </Link>
          </Post>
        );
      })}
    </Wrapper>
  );
};

export default BulletinAllPosts;

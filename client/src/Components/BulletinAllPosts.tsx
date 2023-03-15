import { useState, useEffect, useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { bulletinSearchState, globalCurrentState } from "../atoms";
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
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

interface IPostComment {
  content: string;
  likes: number;
  dislikes: number;
  createdBy: string;
  updatedAt: string;
}

interface IPost {
  comments: [IPostComment];
  anonymity: Boolean;
  board: string;
  content: string;
  createdAt: string;
  createdBy: string;
  createdByUsername: string;
  dislikes: number;
  existingBoard: string;
  likes: number;
  newBoard: string;
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
    let url = `bulletin?board=${boardFilter}`;

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
      console.log(data);

      setIsLoading(false);
    } catch (error: any) {
      console.log(error.response);
      // log user out
      logoutUser();
    }
  }, [boardFilter, logoutUser, searchKeyword, setGlobalCurrentState]);

  useEffect(() => {
    getPost();
  }, [getPost, boardFilter, searchKeyword]);

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
            <Link to={`/bulletin/${post._id}`} state={{ ...post }}>
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
                  <Row style={{ color: "red" }}>
                    <AiOutlineLike />
                    {post.likes}
                  </Row>
                  <Row style={{ color: "blue" }}>
                    <AiOutlineDislike />
                    {post.dislikes}
                  </Row>
                </Icon>
              </Row>
            </Link>
          </Post>
        );
      })}
      {/* pagination button */}
    </Wrapper>
  );
};

export default BulletinAllPosts;

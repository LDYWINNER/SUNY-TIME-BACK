import { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { globalCurrentState } from "../atoms";
import { removeUserFromLocalStorage } from "../utils";
import { authFetch } from "../api";
import Loading from "./Loading";
import { Wrapper, Post } from "../assets/wrappers/BulletinAllPosts";
import { Link } from "react-router-dom";
import moment from "moment";

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
  }, [logoutUser, setGlobalCurrentState]);

  useEffect(() => {
    getPost();
  }, [getPost]);

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
      <div className="posts">
        {globalState.bulletinAllPosts.map((post: IPost) => {
          return (
            <Post key={post._id}>
              <Link to={`/bulletin/${post._id}`} state={{ ...post }}>
                <h1>{post.content}</h1>
                <h2>{moment(post.createdAt).format("MMM Do, YYYY")}</h2>
              </Link>
            </Post>
          );
        })}
      </div>
      {/* pagination button */}
    </Wrapper>
  );
};

export default BulletinAllPosts;

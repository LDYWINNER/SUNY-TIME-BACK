import { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { globalCurrentState } from "../atoms";
import { removeUserFromLocalStorage } from "../utils";
import { authFetch } from "../api";

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
      console.log(data);

      setIsLoading(false);
    } catch (error: any) {
      console.log(error.response);
      //log user out
      // logoutUser();
    }
  }, [logoutUser]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  return <h1>Bulletin All Posts</h1>;
};

export default BulletinAllPosts;

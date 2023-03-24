import { IconButton } from "@chakra-ui/react";
import { useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { authFetch } from "../api";
import { Wrapper, Comment, Row } from "../assets/wrappers/BulletinAllComments";
import { globalCurrentState } from "../atoms";
import { removeUserFromLocalStorage } from "../utils";
import { AiFillLike, AiOutlineLike, AiTwotoneDelete } from "react-icons/ai";

interface IPostComment {
  text: string;
  likes: [string];
  createdBy: string;
  createdByUsername: string;
  anonymity: boolean;
  createdAt: string;
  _id: string;
}

interface IBulletinAllComments {
  comments: [IPostComment];
}

function BulletinAllComments({ comments }: IBulletinAllComments) {
  const [globalState, setGlobalCurrentState] =
    useRecoilState(globalCurrentState);
  const [like, setLike] = useState(true);

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

  const deleteComment = async (id: string) => {
    try {
      await authFetch.delete(`/bulletin/comment/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
      // log user out
      logoutUser();
    }
  };

  const handleLike = async (id: any) => {
    try {
      setLike((prev) => !prev);
      console.log(like);
      await authFetch.patch(`/bulletin/comment/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (comments === undefined) {
    return <h1>Something wrong...</h1>;
  }
  return (
    <Wrapper>
      {comments.map((comment: IPostComment) => {
        return (
          <Comment key={comment._id}>
            <h4>{comment.text}</h4>
            <h4>{comment.anonymity ? "익명" : comment.createdByUsername}</h4>
            <h4>{comment.createdAt}</h4>
            <Row>
              <IconButton
                aria-label="Like this comment?"
                icon={
                  comment?.likes.includes(globalState.user._id) ? (
                    <AiFillLike />
                  ) : (
                    <AiOutlineLike />
                  )
                }
                onClick={() => handleLike(comment._id)}
              />
              <h4>{comment?.likes.length}</h4>
            </Row>
            <IconButton
              aria-label="Delete this comment?"
              icon={<AiTwotoneDelete />}
              onClick={() => deleteComment(comment._id)}
            />
          </Comment>
        );
      })}
    </Wrapper>
  );
}
export default BulletinAllComments;
import { IconButton } from "@chakra-ui/react";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authFetch } from "../api";
import { Wrapper, Comment, Row } from "../assets/wrappers/BulletinAllComments";
import { globalCurrentState } from "../atoms";
import { removeUserFromLocalStorage } from "../utils";
import { AiFillLike, AiOutlineLike, AiTwotoneDelete } from "react-icons/ai";

interface IPostComment {
  content: string;
  likes: [string];
  createdBy: string;
  createdAt: string;
  _id: string;
}

interface IBulletinAllComments {
  comments: [IPostComment];
}

function BulletinAllComments({ comments }: IBulletinAllComments) {
  const navigate = useNavigate();
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

  const handleLike = async (id: string) => {
    try {
      setLike((prev) => !prev);
      console.log(like);
      await authFetch.patch(`/bulletin/comment/?id=${id}`);
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
          <Comment>
            <h4>{comment.content}</h4>
            <h4>{comment.createdBy}</h4>
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

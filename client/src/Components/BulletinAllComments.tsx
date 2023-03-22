import { IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { authFetch } from "../api";
import { Wrapper, Comment, Row } from "../assets/wrappers/BulletinAllComments";
import { globalCurrentState } from "../atoms";

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
  const [globalState, setGlobalCurrentState] =
    useRecoilState(globalCurrentState);
  const [like, setLike] = useState(true);

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
                aria-label="Like this post?"
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
          </Comment>
        );
      })}
    </Wrapper>
  );
}
export default BulletinAllComments;

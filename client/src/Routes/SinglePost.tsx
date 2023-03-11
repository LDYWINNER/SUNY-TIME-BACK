import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Wrapper, TitleRow, Title } from "../assets/wrappers/SinglePost";
import { bulletinBgImageState } from "../atoms";

interface IPostComment {
  content: string;
  likes: number;
  dislikes: number;
  createdBy: string;
  updatedAt: string;
}

interface RouteState {
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

function SinglePost() {
  const bgImage = useRecoilValue(bulletinBgImageState);
  const location = useLocation();
  const state = location.state as RouteState;

  return (
    <Wrapper bgImage={bgImage}>
      <TitleRow>
        <Title>Board</Title>
      </TitleRow>
      <h1>{state.title}</h1>
      <button type="button" className="btn delete-btn" onClick={() => "delete"}>
        DELETE
      </button>
    </Wrapper>
  );
}

export default SinglePost;

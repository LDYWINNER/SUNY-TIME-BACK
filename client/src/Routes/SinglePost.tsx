import moment from "moment";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  Wrapper,
  Container,
  TitleRow,
  Title,
} from "../assets/wrappers/SinglePost";
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

function SinglePost() {
  const bgImage = useRecoilValue(bulletinBgImageState);
  const location = useLocation();
  const state = location.state as RouteState;

  return (
    <Wrapper bgImage={bgImage}>
      <Container>
        <div>back buttton</div>
        <TitleRow>
          <Title>{state.newBoard ? state.newBoard : state.existingBoard}</Title>
        </TitleRow>
        <h1>{state.title}</h1>
        <h4>{state.anonymity ? "익명" : state.createdByUsername}</h4>
        <h4>{state.content}</h4>
        <h4>{moment(state.createdAt).format("MMMM Do, h:mm a")}</h4>
        <h4>{state.likes}</h4>
        <h4>{state.dislikes}</h4>
        <div>comments</div>
        <button
          type="button"
          className="btn delete-btn"
          onClick={() => "delete"}
        >
          DELETE
        </button>
      </Container>
    </Wrapper>
  );
}

export default SinglePost;

import moment from "moment";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { authFetch } from "../api";
import {
  Wrapper,
  Container,
  TitleRow,
  Title,
} from "../assets/wrappers/SinglePost";
import { bulletinBgImageState, globalCurrentState } from "../atoms";
import { removeUserFromLocalStorage } from "../utils";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const bgImage = useRecoilValue(bulletinBgImageState);
  const location = useLocation();
  const state = location.state as RouteState;
  const [globalState, setGlobalCurrentState] =
    useRecoilState(globalCurrentState);

  const logoutUser = () => {
    setGlobalCurrentState((currentState) => {
      return {
        ...currentState,
        user: null,
        token: null,
      };
    });
    removeUserFromLocalStorage();
    window.location.reload();
  };

  const deletePost = async (id: string) => {
    try {
      await authFetch.delete(`/bulletin/${id}`);
      navigate("/bulletin");
    } catch (error) {
      console.log(error);
      // log user out
      logoutUser();
    }
  };

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
          onClick={() => deletePost(state._id)}
        >
          DELETE
        </button>
      </Container>
    </Wrapper>
  );
}

export default SinglePost;

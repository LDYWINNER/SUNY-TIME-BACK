import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  const state = location.state as RouteState;

  return (
    <div>
      <h1>{state.title}</h1>
    </div>
  );
}

export default SinglePost;

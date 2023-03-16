import moment from "moment";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { authFetch } from "../api";
import {
  Wrapper,
  Container,
  Main,
  TitleRow,
  Title,
  Row,
} from "../assets/wrappers/SinglePost";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { bulletinBgImageState, globalCurrentState } from "../atoms";
import { removeUserFromLocalStorage } from "../utils";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const [like, setLike] = useState(true);
  const [dislike, setDislike] = useState(true);

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

  const handleLike = async (id: string) => {
    try {
      setLike((prev) => !prev);
      console.log(like);
      await authFetch.patch(`/bulletin?id=${id}&like=${like}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async (id: string) => {
    try {
      setDislike((prev) => !prev);
      console.log(dislike);
      await authFetch.patch(`/bulletin?id=${id}&dislike=${dislike}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper bgImage={bgImage}>
      <Container>
        <IconButton
          onClick={() => {
            navigate("/bulletin");
          }}
          aria-label="Go back"
          icon={<BiArrowBack />}
        />
        <Main>
          <TitleRow>
            <Title>
              {state.newBoard ? state.newBoard : state.existingBoard}
            </Title>
            <button type="button" className="btn delete-btn" onClick={onOpen}>
              DELETE
            </button>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isCentered
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Post
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => deletePost(state._id)}
                      ml={3}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </TitleRow>
          <h1>{state.title}</h1>
          <h4>{state.anonymity ? "익명" : state.createdByUsername}</h4>
          <h4>{state.content}</h4>
          <h4>{moment(state.createdAt).format("MMMM Do, h:mm a")}</h4>
          <Row>
            <IconButton
              aria-label="Like this post"
              icon={like ? <AiOutlineLike /> : <AiFillLike />}
              onClick={() => handleLike(state._id)}
            />
            <h4>{state.likes}</h4>
            <IconButton
              aria-label="Dislike this post"
              onClick={() => handleDislike(state._id)}
              icon={dislike ? <AiOutlineDislike /> : <AiFillDislike />}
            />
            <h4>{state.dislikes}</h4>
          </Row>
          <div>comments</div>
        </Main>
      </Container>
    </Wrapper>
  );
}

export default SinglePost;

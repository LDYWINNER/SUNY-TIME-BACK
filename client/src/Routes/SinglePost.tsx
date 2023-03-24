import moment from "moment";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authFetch } from "../api";
import {
  Wrapper,
  Container,
  Main,
  TitleRow,
  Title,
  Row,
  Comments,
  LoadingWrapper,
} from "../assets/wrappers/SinglePost";
import { bgImages } from "../assets/assets";
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
import { useRef, useState, useCallback, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import Loading from "../Components/Loading";
import { BulletinCommentPost, BulletinAllComments } from "../Components";

interface IPostComment {
  text: string;
  likes: [string];
  createdBy: string;
  createdByUsername: string;
  anonymity: boolean;
  createdAt: string;
  _id: string;
}

interface IPost {
  comments: [IPostComment];
  anonymity: Boolean;
  board: string;
  content: string;
  createdAt: string;
  createdByUsername: string;
  likes: [string];
  title: string;
}

function SinglePost() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [bgImage, setBgImage] = useRecoilState(bulletinBgImageState);
  const location = useLocation();
  const { id } = location.state;
  const [globalState, setGlobalCurrentState] =
    useRecoilState(globalCurrentState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const [like, setLike] = useState(true);
  const [post, setPost] = useState<IPost>();

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
  const getSinglePost = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await authFetch(`bulletin/${id}`);
      const {
        post: {
          comments,
          anonymity,
          board,
          content,
          createdAt,
          createdByUsername,
          likes,
          title,
        },
      } = data;
      setPost({
        comments,
        anonymity,
        board,
        content,
        createdAt,
        createdByUsername,
        likes,
        title,
      });
      console.log(data);

      setIsLoading(false);
    } catch (error: any) {
      console.log(error.response);
      // log user out
      logoutUser();
    }
  }, [id, logoutUser]);

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
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setBgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
    getSinglePost();
  }, []);

  if (isLoading) {
    return (
      <LoadingWrapper>
        <Loading center />
      </LoadingWrapper>
    );
  }
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
            <Title>{post?.board}</Title>
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
                      onClick={() => deletePost(id)}
                      ml={3}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </TitleRow>
          <h1>{post?.title}</h1>
          <h4>{post?.anonymity ? "익명" : post?.createdByUsername}</h4>
          <h4>{post?.content}</h4>
          <h4>{moment(post?.createdAt).format("MMMM Do, h:mm a")}</h4>
          <Row>
            <IconButton
              aria-label="Like this post?"
              icon={
                post?.likes.includes(globalState.user._id) ? (
                  <AiFillLike />
                ) : (
                  <AiOutlineLike />
                )
              }
              onClick={() => handleLike(id)}
            />
            <h4>{post?.likes.length}</h4>
          </Row>
          <Comments>
            <BulletinCommentPost id={id} />
            <BulletinAllComments comments={post?.comments as [IPostComment]} />
          </Comments>
        </Main>
      </Container>
    </Wrapper>
  );
}

export default SinglePost;

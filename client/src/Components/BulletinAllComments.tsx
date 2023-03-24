import { useState, useCallback, useRef } from "react";
import { useRecoilState } from "recoil";
import { authFetch } from "../api";
import { Wrapper, Comment, Row } from "../assets/wrappers/BulletinAllComments";
import { globalCurrentState } from "../atoms";
import { removeUserFromLocalStorage } from "../utils";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

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
              onClick={onOpen}
            />
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isCentered
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Comment
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
                      onClick={() => deleteComment(comment._id)}
                      ml={3}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Comment>
        );
      })}
    </Wrapper>
  );
}
export default BulletinAllComments;

import { useState, useCallback, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { authFetch } from "../api";
import {
  Wrapper,
  Comment,
  Row,
  SecondRow,
  Buttons,
  Name,
  Text,
} from "../assets/wrappers/BulletinAllComments";
import { globalCurrentState, isDarkAtom } from "../atoms";
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
import moment from "moment";

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
  const isDark = useRecoilValue(isDarkAtom);

  const logoutUser = useCallback(() => {
    setGlobalCurrentState((currentState) => {
      return {
        ...currentState,
        user: null,
        token: null,
      };
    });
    removeUserFromLocalStorage();
    localStorage.setItem("courseSubjSearchFilter", "AMS");
    localStorage.setItem("filterInstructor", "ALL");
    window.location.reload();
  }, [setGlobalCurrentState]);

  const deleteComment = async (id: string) => {
    try {
      await authFetch.delete(`/course/review/${id}`);
      window.location.reload();
    } catch (error) {
      // console.log(error);
      // log user out
      logoutUser();
    }
  };

  const handleLike = async (id: any) => {
    try {
      setLike((prev) => !prev);
      // console.log(like);
      await authFetch.patch(`/course/review/${id}`);
      window.location.reload();
    } catch (error) {
      // console.log(error);
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
            <Row>
              <Name>
                {comment.anonymity ? "익명" : comment.createdByUsername}
              </Name>
              <h4 className="time">
                {moment(comment?.createdAt).format("MMMM Do, h:mm a")}
              </h4>
            </Row>

            <SecondRow>
              <Text>{comment.text}</Text>
              <Buttons>
                <IconButton
                  colorScheme={isDark ? "blackAlpha" : "gray"}
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
                <h4>{comment?.likes.length} likes</h4>
                <IconButton
                  colorScheme={isDark ? "blackAlpha" : "gray"}
                  aria-label="Delete this comment?"
                  icon={<AiTwotoneDelete />}
                  onClick={onOpen}
                />
              </Buttons>
            </SecondRow>
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

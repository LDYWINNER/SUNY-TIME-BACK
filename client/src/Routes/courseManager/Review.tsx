import { useState, useCallback, useRef } from "react";
import { useRecoilState } from "recoil";
import { authFetch } from "../../api";
import { globalCurrentState } from "../../atoms";
import { removeUserFromLocalStorage } from "../../utils";
import { CourseReviewModal } from "../../Components/index";
import { useDisclosure, IconButton } from "@chakra-ui/react";
import {
  Wrapper,
  CourseReviewBtn,
  Reviews,
  SingleReview,
  Row,
} from "../../assets/wrappers/Review";
import { BsPencilSquare } from "react-icons/bs";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

interface ICourseReview {
  course: string;
  semester: string;
  homeworkQuantity: string;
  teamProjectPresence: boolean;
  difficulty: string;
  testQuantity: number;
  quizPresence: boolean;
  overallGrade: number;
  overallEvaluation: string;
  createdBy: string;
  createdByUsername: string;
  anonymity: boolean;
  likes: [string];
  _id: string;
  createdAt: string;
}

interface IReview {
  id: any;
  reviews: [ICourseReview];
}

const Review = ({ id, reviews }: IReview) => {
  //course review modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  //course reviews
  const [globalState, setGlobalCurrentState] =
    useRecoilState(globalCurrentState);
  const [like, setLike] = useState(true);

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

  if (reviews === undefined) {
    return <h1>Something wrong...</h1>;
  }
  return (
    <Wrapper>
      <CourseReviewBtn type="button" className="btn" onClick={onOpen}>
        <BsPencilSquare />
        Review Course
      </CourseReviewBtn>
      <CourseReviewModal id={id} isOpen={isOpen} onClose={onClose} />
      <Reviews>
        {reviews.map((review: ICourseReview) => {
          return (
            <SingleReview key={review._id}>
              <h4>{review.anonymity ? "익명" : review.createdByUsername}</h4>
              <h4>{review.createdAt}</h4>
              <h4>
                {review.overallEvaluation !== "" && review.overallEvaluation}
              </h4>
              <Row>
                <IconButton
                  aria-label="Like this comment?"
                  icon={
                    review?.likes.includes(globalState.user._id) ? (
                      <AiFillLike />
                    ) : (
                      <AiOutlineLike />
                    )
                  }
                  onClick={() => handleLike(review._id)}
                />
                <h4>{review?.likes.length}</h4>
              </Row>
            </SingleReview>
          );
        })}
      </Reviews>
    </Wrapper>
  );
};

export default Review;

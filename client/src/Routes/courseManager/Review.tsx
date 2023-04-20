import { useState } from "react";
import { useRecoilValue } from "recoil";
import { authFetch } from "../../api";
import { globalCurrentState, isDarkAtom } from "../../atoms";
import { CourseReviewModal } from "../../Components/index";
import { useDisclosure, IconButton } from "@chakra-ui/react";
import {
  Wrapper,
  CourseReviewBtn,
  Reviews,
  SingleReview,
  Container,
  ButtonContainer,
  Name,
  Likes,
  Grade,
  Row,
  NoReviewSpan,
} from "../../assets/wrappers/Review";
import { BsPencilSquare } from "react-icons/bs";
import { AiFillLike, AiFillStar, AiOutlineLike } from "react-icons/ai";
import moment from "moment";

interface ICourseReview {
  course: string;
  semester: string;
  instructor: string;
  myLetterGrade: string;
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
  reviewsExisting: boolean;
}

const Review = ({ id, reviews, reviewsExisting }: IReview) => {
  //course review modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  //course reviews
  const globalState = useRecoilValue(globalCurrentState);
  const [like, setLike] = useState(true);
  const isDark = useRecoilValue(isDarkAtom);

  const handleLike = async (id: any) => {
    try {
      setLike((prev) => !prev);
      console.log(like);
      await authFetch.patch(`/course/review/${id}`);
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
      <ButtonContainer>
        <CourseReviewBtn type="button" className="btn" onClick={onOpen}>
          <BsPencilSquare />
          <h4>Review Course</h4>
        </CourseReviewBtn>
        <CourseReviewModal id={id} isOpen={isOpen} onClose={onClose} />
      </ButtonContainer>
      <Reviews>
        {reviewsExisting ? (
          <NoReviewSpan>No review yet for this course... :(</NoReviewSpan>
        ) : (
          <></>
        )}
        {reviews.map((review: ICourseReview) => {
          if (review.overallEvaluation !== "") {
            return (
              <SingleReview key={review._id}>
                <Container>
                  <Name>
                    <h4>
                      {review.anonymity ? "익명" : review.createdByUsername}
                    </h4>
                    {review?.myLetterGrade ? (
                      <Grade>{review?.myLetterGrade}</Grade>
                    ) : (
                      <></>
                    )}
                  </Name>
                  <h4>
                    {review.overallGrade === 1 ? (
                      <Row>
                        <AiFillStar color="yellow" />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                      </Row>
                    ) : review.overallGrade === 2 ? (
                      <Row>
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                      </Row>
                    ) : review.overallGrade === 3 ? (
                      <Row>
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiFillStar />
                        <AiFillStar />
                      </Row>
                    ) : review.overallGrade === 4 ? (
                      <Row>
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiFillStar />
                      </Row>
                    ) : (
                      <Row>
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                        <AiFillStar color="yellow" />
                      </Row>
                    )}
                  </h4>
                  <h4>{review.overallEvaluation}</h4>
                </Container>
                <Container>
                  <h4>{moment(review.createdAt).format("MMMM Do, h:mm a")}</h4>
                  <Likes>
                    <IconButton
                      colorScheme={isDark ? "blackAlpha" : "gray"}
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
                    <h4>{review?.likes.length} likes</h4>
                  </Likes>
                </Container>
              </SingleReview>
            );
          }
          return <></>;
        })}
      </Reviews>
    </Wrapper>
  );
};

export default Review;

import { useDisclosure } from "@chakra-ui/react";
import { BsPencilSquare } from "react-icons/bs";
import { Wrapper, CourseReviewBtn } from "../../assets/wrappers/Review";
import { CourseReviewModal } from "../../Components/index";

interface IReview {
  id: any;
}

const Review = ({ id }: IReview) => {
  //course review modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Wrapper>
      <h1>Review</h1>
      <CourseReviewBtn type="button" className="btn" onClick={onOpen}>
        <BsPencilSquare />
        Review Course
      </CourseReviewBtn>
      <CourseReviewModal id={id} isOpen={isOpen} onClose={onClose} />
    </Wrapper>
  );
};

export default Review;

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
}

interface IOverallInfo {
  reviews: [ICourseReview];
}

const OverallInfo = ({ reviews }: IOverallInfo) => {
  return <h1>OverallInfo</h1>;
};

export default OverallInfo;

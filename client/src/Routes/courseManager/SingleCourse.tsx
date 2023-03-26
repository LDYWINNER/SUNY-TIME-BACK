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

interface ICourse {
  _id: string;
  semester: [string];
  classNbr: number;
  subj: string;
  crs: number;
  courseTitle: string;
  sbc: string;
  cmp: string;
  sctn: string;
  credits: number;
  day: string;
  startTime: Date;
  endTime: Date;
  room: string;
  instructor: string;
  likes: [string];
  reviews: [ICourseReview];
}

const SingleCourse = () => {
  return <h1>Single Course</h1>;
};
export default SingleCourse;

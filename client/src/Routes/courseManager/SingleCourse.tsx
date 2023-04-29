import { useCallback, useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authFetch } from "../../api";
import { OverallInfo, Review, CourseBulletin } from "./index";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
} from "@chakra-ui/react";
import {
  LoadingWrapper,
  Wrapper,
  Container,
  Main,
  Info,
  Title,
  Likes,
  ClassieBtn,
  WoolfieIcon,
} from "../../assets/wrappers/SingleCourse";
import {
  courseReviewInstructorState,
  courseReviewsState,
  currentCourseState,
  globalCurrentState,
  isDarkAtom,
} from "../../atoms";
import { Loading } from "../../Components";
import { removeUserFromLocalStorage } from "../../utils";
import Woolfie from "../../assets/images/woolfie.png";
import { Link } from "react-router-dom";

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

interface ICourse {
  _id: string;
  classNbr: string;
  subj: string;
  crs: string;
  courseTitle: string;
  sbc: string;
  cmp: string;
  sctn: string;
  credits: string;
  likes: [string];
  reviews: [ICourseReview];
  day: string;
  startTime: string;
  endTime: string;
  room: string;
  instructor: string;
  instructor_names: string;
  semesters: any;
}

const SingleCourse = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [globalState, setGlobalCurrentState] =
    useRecoilState(globalCurrentState);
  const location = useLocation();
  const { id } = location.state;
  const [like, setLike] = useState(true);
  const [course, setCourse] = useState<ICourse>();
  const setCourseReviewInstructorState = useSetRecoilState(
    courseReviewInstructorState
  );
  const isDark = useRecoilValue(isDarkAtom);
  const setCourseReview = useSetRecoilState(courseReviewsState);
  const setCurrentCourse = useSetRecoilState(currentCourseState);

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

  //getting the posts
  const getSingleCourse = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await authFetch(`course/${id}`);
      const {
        course: {
          _id,
          classNbr,
          subj,
          crs,
          courseTitle,
          sbc,
          cmp,
          sctn,
          credits,
          day,
          startTime,
          endTime,
          room,
          instructor,
          likes,
          reviews,
          instructor_names,
          semesters,
        },
      } = data;
      setCourse({
        _id,
        classNbr,
        subj,
        crs,
        courseTitle,
        sbc,
        cmp,
        sctn,
        credits,
        day: day.includes(",") ? day.split(",") : [day],
        startTime: startTime.includes(",") ? startTime.split(",") : [startTime],
        endTime: endTime.includes(",") ? endTime.split(",") : [endTime],
        room: room.includes(",") ? room.split(",") : [room],
        instructor,
        likes,
        reviews,
        instructor_names:
          instructor.length === 2
            ? instructor_names.split(",")
            : [instructor_names],
        semesters,
      });
      setCourseReviewInstructorState((currentState) => {
        let instructor_result = [];
        if (instructor.length === 2) {
          instructor_result = instructor;
          if (instructor_result[0] === instructor_result[1]) {
            instructor_result.pop();
          }
        } else if (instructor.length === 1) {
          instructor_result = [instructor_names];
        }

        return {
          ...currentState,
          instructorNum: instructor.length,
          instructorName: instructor_result,
        };
      });

      setCourseReview(reviews);

      setCurrentCourse({
        subj,
        crs,
      });
      localStorage.setItem(
        "currentCourse",
        JSON.stringify({
          subj,
          crs,
        })
      );

      console.log(data);

      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      // log user out
      logoutUser();
    }
  }, [id, logoutUser]);

  const handleLike = async (id: string) => {
    try {
      setLike((prev) => !prev);
      console.log(like);
      await authFetch.patch(`/course?id=${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleCourse();
  }, []);

  if (isLoading) {
    return (
      <LoadingWrapper>
        <Loading center />
      </LoadingWrapper>
    );
  }
  return (
    <Wrapper>
      <Container>
        <IconButton
          colorScheme={isDark ? "blackAlpha" : "gray"}
          onClick={() => {
            navigate(-1);
          }}
          aria-label="Go back"
          icon={<BiArrowBack />}
        />
        <Main>
          <Info>
            <div>
              <Title>
                {course?.subj}
                {course?.crs} : {course?.courseTitle}
              </Title>
              <h4>Credits: {course?.credits}</h4>
              {course?.sbc !== "NaN" ? <h4>SBC: {course?.sbc}</h4> : <></>}
              <h4>
                Day:{" "}
                {course?.semesters.length === 2
                  ? `2023 Spring - ${course?.day[1]} & 2022 Fall - ${course?.day[0]}`
                  : course?.semesters.length === 1 &&
                    course?.semesters[0] === "2022_fall"
                  ? `2022 Fall - ${course?.day[0]}`
                  : course?.semesters.length === 1 &&
                    course?.semesters[0] === "2023_spring"
                  ? `2023 Spring - ${course?.day[0]}`
                  : "No day info :("}
              </h4>
              <h4>
                Time:{" "}
                {course?.semesters.length === 2
                  ? `2023 Spring - ${course?.startTime[1]} ~ ${course?.endTime[1]} & 2022 Fall - ${course?.startTime[0]} ~ ${course?.endTime[0]}`
                  : course?.semesters.length === 1 &&
                    course?.semesters[0] === "2022_fall"
                  ? `2022 Fall - ${course?.startTime[0]} ~ ${course?.endTime[0]}`
                  : course?.semesters.length === 1 &&
                    course?.semesters[0] === "2023_spring"
                  ? `2023 Spring - ${course?.startTime[0]} ~ ${course?.endTime[0]}`
                  : "No time info :("}
              </h4>
              <h4>
                Room:{" "}
                {course?.semesters.length === 2
                  ? `2023 Spring - ${course?.room[1]} & 2022 Fall - ${course?.room[0]}`
                  : course?.semesters.length === 1 &&
                    course?.semesters[0] === "2022_fall"
                  ? `2022 Fall - ${course?.room[0]}`
                  : course?.semesters.length === 1 &&
                    course?.semesters[0] === "2023_spring"
                  ? `2023 Spring - ${course?.room[0]}`
                  : "No room info :("}
              </h4>
              <h4>
                Instructor:{" "}
                {course?.semesters.length === 2
                  ? `2023 Spring - ${course?.instructor_names[1]} & 2022 Fall - ${course?.instructor_names[0]}`
                  : course?.semesters.length === 1 &&
                    course?.semesters[0] === "2022_fall"
                  ? `2022 Fall - ${course?.instructor_names[0]}`
                  : course?.semesters.length === 1 &&
                    course?.semesters[0] === "2023_spring"
                  ? `2023 Spring - ${course?.instructor_names[0]}`
                  : "No instructor info :("}
              </h4>
            </div>
            <Likes>
              <div>
                <IconButton
                  colorScheme={isDark ? "blackAlpha" : "gray"}
                  size="lg"
                  aria-label="Like this course?"
                  icon={
                    course?.likes.includes(globalState.user._id) ? (
                      <AiFillLike />
                    ) : (
                      <AiOutlineLike />
                    )
                  }
                  onClick={() => handleLike(id)}
                />
                <h4>{course?.likes.length} likes</h4>
              </div>
              <div>
                <Link
                  to={`https://classie-evals.stonybrook.edu/?SearchKeyword=${course?.subj}${course?.crs}&SearchTerm=ALL`}
                >
                  <ClassieBtn type="button" className="btn">
                    <WoolfieIcon src={Woolfie} />
                    <span>Go to Classie Eval</span>
                  </ClassieBtn>
                </Link>
              </div>
            </Likes>
          </Info>

          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Overall Info</Tab>
              <Tab>Review</Tab>
              <Tab>Bulletin</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <OverallInfo />
              </TabPanel>
              <TabPanel>
                <Review
                  id={id}
                  reviews={course?.reviews as [ICourseReview]}
                  reviewsExisting={
                    course?.reviews.filter(
                      (review) => review.overallEvaluation !== ""
                    ).length === 0
                  }
                />
              </TabPanel>
              <TabPanel>
                <CourseBulletin id={id} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Main>
      </Container>
    </Wrapper>
  );
};
export default SingleCourse;

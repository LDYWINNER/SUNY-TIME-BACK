import { useCallback, useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
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
  Info,
  Title,
  Row,
} from "../../assets/wrappers/SingleCourse";
import {
  courseReviewInstructorState,
  courseReviewResultState,
  globalCurrentState,
} from "../../atoms";
import { Loading } from "../../Components";
import { removeUserFromLocalStorage } from "../../utils";

interface ICRResult {
  stars: number;
  homeworkQuantity: [number, number, number];
  difficulty: [number, number, number];
  testQuantity: [number, number, number, number];
  teamProjectPresence: [number, number];
  quizPresence: [number, number];
}

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
  day: [{ "2022_fall": string }, { "2023_spring": string }];
  startTime: [{ "2022_fall": string }, { "2023_spring": string }];
  endTime: [{ "2022_fall": string }, { "2023_spring": string }];
  room: [{ "2022_fall": string }, { "2023_spring": string }];
  instructor: [{ "2022_fall": string }, { "2023_spring": string }];
  likes: [string];
  reviews: [ICourseReview];
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
  const [courseReviewResult, setCourseReviewResult] = useRecoilState(
    courseReviewResultState
  );

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
        day,
        startTime,
        endTime,
        room,
        instructor,
        likes,
        reviews,
      });
      setCourseReviewInstructorState((currentState) => {
        return {
          ...currentState,
          instructorNum:
            instructor[0]["2022_fall"] === instructor[1]["2023_spring"] ? 1 : 2,
          instructorName: [
            instructor[0]["2022_fall"],
            instructor[1]["2023_spring"],
          ],
        };
      });

      //calculate course review data
      let starTemp = 0;
      let hwqTemp = [0, 0, 0];
      let difficultyTemp = [0, 0, 0];
      let tqTemp = [0, 0, 0, 0];
      let tppTemp = [0, 0];
      let qpTemp = [0, 0];
      const totalLength = reviews.length;
      for (let i = 0; i < totalLength; i++) {
        //star
        starTemp += reviews[i].overallGrade;
        //homeworkQuantity
        if (reviews[i].homeworkQuantity === "many") {
          hwqTemp[0]++;
        } else if (reviews[i].homeworkQuantity === "soso") {
          hwqTemp[1]++;
        } else {
          hwqTemp[2]++;
        }
        //difficulty
        if (reviews[i].difficulty === "difficult") {
          difficultyTemp[0]++;
        } else if (reviews[i].difficulty === "soso") {
          difficultyTemp[1]++;
        } else {
          difficultyTemp[2]++;
        }
        //testQuantity
        if (reviews[i].testQuantity === 0) {
          tqTemp[0]++;
        } else if (reviews[i].testQuantity === 1) {
          tqTemp[1]++;
        } else if (reviews[i].testQuantity === 2) {
          tqTemp[2]++;
        } else {
          tqTemp[3]++;
        }
        //teamProjectPresence
        if (reviews[i].teamProjectPresence === true) {
          tppTemp[0]++;
        } else {
          tppTemp[1]++;
        }
        //quizPresence
        if (reviews[i].quizPresence === true) {
          qpTemp[0]++;
        } else {
          qpTemp[1]++;
        }
      }
      //star
      starTemp = starTemp / totalLength;
      //homeworkQuantity, difficulty
      for (let j = 0; j < 3; j++) {
        hwqTemp[j] = Math.floor((hwqTemp[j] / totalLength) * 100);
        difficultyTemp[j] = Math.floor((difficultyTemp[j] / totalLength) * 100);
      }
      //testQuantity
      for (let k = 0; k < 4; k++) {
        tqTemp[k] = Math.floor((tqTemp[k] / totalLength) * 100);
      }
      //teamProjectPresence, quizPresence
      for (let j = 0; j < 2; j++) {
        tppTemp[j] = Math.floor((tppTemp[j] / totalLength) * 100);
        qpTemp[j] = Math.floor((qpTemp[j] / totalLength) * 100);
      }

      setCourseReviewResult((currentState) => {
        return {
          ...currentState,
          stars: parseFloat(starTemp.toFixed(2)),
          homeworkQuantity: hwqTemp,
          difficulty: difficultyTemp,
          testQuantity: tqTemp,
          teamProjectPresence: tppTemp,
          quizPresence: qpTemp,
        };
      });
      console.log(data);

      setIsLoading(false);
    } catch (error: any) {
      console.log(error.response);
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
          onClick={() => {
            navigate("/course-manager/all");
          }}
          aria-label="Go back"
          icon={<BiArrowBack />}
        />
        <Info>
          <Title>
            {course?.subj}
            {course?.crs} : {course?.courseTitle}
          </Title>
          <Row>
            <h4>sbc: {course?.sbc}</h4>
            <h4>credits: {course?.credits}</h4>
          </Row>
          <h4>
            day: 2022 fall - {course?.day[0]["2022_fall"]} & 2023 spring -{" "}
            {course?.day[1]["2023_spring"]}
          </h4>
          <h4>
            time: 2022 fall - {course?.startTime[0]["2022_fall"]} ~{" "}
            {course?.endTime[0]["2022_fall"]} & 2023 spring -{" "}
            {course?.startTime[1]["2023_spring"]} ~{" "}
            {course?.endTime[1]["2023_spring"]}
          </h4>
          <h4>
            room: 2022 fall - {course?.room[0]["2022_fall"]} & 2023 spring -{" "}
            {course?.room[1]["2023_spring"]}
          </h4>
          <h4>
            instructor: 2022 fall - {course?.instructor[0]["2022_fall"]} & 2023
            spring - {course?.instructor[1]["2023_spring"]}
          </h4>
        </Info>
        <IconButton
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
        <h4>{course?.likes.length}</h4>

        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Overall Info</Tab>
            <Tab>Review</Tab>
            <Tab>Bulletin</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <OverallInfo crResult={courseReviewResult as ICRResult} />
            </TabPanel>
            <TabPanel>
              <Review id={id} reviews={course?.reviews as [ICourseReview]} />
            </TabPanel>
            <TabPanel>
              <CourseBulletin />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Wrapper>
  );
};
export default SingleCourse;

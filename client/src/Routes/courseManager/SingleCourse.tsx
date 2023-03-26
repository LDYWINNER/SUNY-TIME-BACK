import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authFetch } from "../../api";
import {
  LoadingWrapper,
  Wrapper,
  Info,
  Title,
  Row,
} from "../../assets/wrappers/SingleCourse";
import { globalCurrentState } from "../../atoms";
import { Loading } from "../../Components";
import { removeUserFromLocalStorage } from "../../utils";

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
  const [isLoading, setIsLoading] = useState(false);
  const [globalState, setGlobalCurrentState] =
    useRecoilState(globalCurrentState);
  const location = useLocation();
  const { id }: { id: string } = location.state;
  const [like, setLike] = useState(true);
  const [course, setCourse] = useState<ICourse>();

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
    </Wrapper>
  );
};
export default SingleCourse;

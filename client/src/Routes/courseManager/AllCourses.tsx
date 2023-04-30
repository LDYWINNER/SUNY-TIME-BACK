import { useCallback, useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { authFetch } from "../../api";
import {
  Wrapper,
  Main,
  MainContent,
  SubContent,
  FilterRow,
  TitleRow,
  Title,
  Courses,
  Course,
  Container,
  Row,
  IconRow,
  Icon,
  ClassieBtn,
  WoolfieIcon,
} from "../../assets/wrappers/AllCourses";
import { courseSearchState, globalCurrentState, isDarkAtom } from "../../atoms";
import { CourseSearch, CoursePagination, Announcement } from "../../Components";
import { Loading } from "../../Components";
import { removeUserFromLocalStorage } from "../../utils";
import Woolfie from "../../assets/images/woolfie.png";

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

const AllCourses = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [globalState, setGlobalCurrentState] =
    useRecoilState(globalCurrentState);
  const { courseNumOfPages } = useRecoilValue(globalCurrentState);
  const { courseSubjFilter, searchKeyword } = useRecoilValue(courseSearchState);
  const courseSubjSearchFilter = localStorage.getItem("courseSubjSearchFilter");
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
    localStorage.setItem("filterSemester", "ALL");
    window.location.reload();
  }, [setGlobalCurrentState]);

  //getting the posts
  const getCourse = useCallback(async () => {
    let url = `course?page=${globalState.coursePage}&subj=${courseSubjSearchFilter}`;

    if (searchKeyword) {
      url = url + `&search=${searchKeyword}`;
    }

    setIsLoading(true);
    try {
      const { data } = await authFetch(url);
      const { allCourses, totalCourses, courseNumOfPages } = data;
      setGlobalCurrentState((currentState) => {
        return {
          ...currentState,
          allCourses,
          totalCourses,
          courseNumOfPages,
        };
      });
      console.log(data);

      setIsLoading(false);
    } catch (error: any) {
      console.log(error.response);
      // log user out
      logoutUser();
    }
  }, [
    globalState.coursePage,
    courseSubjSearchFilter,
    searchKeyword,
    setGlobalCurrentState,
    logoutUser,
  ]);

  useEffect(() => {
    getCourse();
    localStorage.setItem("filterInstructor", "ALL");
    localStorage.setItem("filterSemester", "ALL");
    localStorage.setItem(
      "currentCourse",
      JSON.stringify({ subj: "AMS", crs: "151" })
    );
  }, [getCourse, courseSubjFilter, searchKeyword, globalState.coursePage]);

  return (
    <Wrapper>
      <Main>
        <MainContent>
          <FilterRow>
            <CourseSearch />
          </FilterRow>
          <TitleRow>
            <Title>
              {courseSubjSearchFilter === "SHCourse"
                ? "Faculty of Sciences and Humanities"
                : courseSubjSearchFilter}{" "}
              Courses
            </Title>
            {courseSubjSearchFilter !== "SHCourse" && (
              <Link
                to={
                  courseSubjSearchFilter === "AMS"
                    ? "https://www.stonybrook.edu/sb/bulletin/current/academicprograms/ams/"
                    : courseSubjSearchFilter === "ACC/BUS"
                    ? "https://www.stonybrook.edu/sb/bulletin/current/academicprograms/bus/"
                    : courseSubjSearchFilter === "CSE"
                    ? "https://www.stonybrook.edu/sb/bulletin/current/academicprograms/cse/"
                    : courseSubjSearchFilter === "ESE"
                    ? "https://www.stonybrook.edu/sb/bulletin/current/academicprograms/ese/"
                    : courseSubjSearchFilter === "EST/EMP"
                    ? "https://www.stonybrook.edu/sb/bulletin/current/academicprograms/tsm/"
                    : courseSubjSearchFilter === "MEC"
                    ? "https://www.stonybrook.edu/sb/bulletin/current/academicprograms/mec/"
                    : ""
                }
              >
                <ClassieBtn type="button" className="btn">
                  <WoolfieIcon src={Woolfie} />
                  <span>Go to Bulletin</span>
                </ClassieBtn>
              </Link>
            )}
          </TitleRow>
          {isLoading && <Loading center />}
          <Courses>
            {globalState.allCourses.map((course: ICourse) => {
              return (
                <Course key={course._id}>
                  <Link
                    to={`/course-manager/${course._id}`}
                    state={{ id: course._id }}
                  >
                    <Container>
                      <h4>
                        {course.subj}
                        {course.crs} : {course.courseTitle}
                      </h4>
                      <IconRow>
                        <Icon>
                          <Row style={{ color: isDark ? "yellow" : "blue" }}>
                            <AiOutlineLike />
                            {course.likes.length}
                          </Row>
                        </Icon>
                      </IconRow>
                    </Container>
                  </Link>
                </Course>
              );
            })}
          </Courses>
          {courseNumOfPages > 1 && <CoursePagination />}
        </MainContent>
        <SubContent>
          <Announcement />
        </SubContent>
      </Main>
    </Wrapper>
  );
};
export default AllCourses;

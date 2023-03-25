import { useRecoilValue } from "recoil";
import {
  Wrapper,
  Main,
  MainContent,
  SubContent,
  FilterRow,
  TitleRow,
  Title,
} from "../../assets/wrappers/AllCourses";
import { courseSearchState, globalCurrentState } from "../../atoms";
import { CourseSearch, CoursePagination } from "../../Components";

const AllCourses = () => {
  const { courseNumOfPages } = useRecoilValue(globalCurrentState);
  const { courseSubjFilter } = useRecoilValue(courseSearchState);

  return (
    <Wrapper>
      <Main>
        <MainContent>
          <FilterRow>
            <CourseSearch />
          </FilterRow>
          <TitleRow>
            <Title>{courseSubjFilter}</Title>
          </TitleRow>
          <h1>All Courses</h1>
          {courseNumOfPages > 1 && <CoursePagination />}
        </MainContent>
        <SubContent></SubContent>
      </Main>
    </Wrapper>
  );
};
export default AllCourses;

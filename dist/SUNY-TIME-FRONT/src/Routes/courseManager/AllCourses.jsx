"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ai_1 = require("react-icons/ai");
const react_router_dom_1 = require("react-router-dom");
const recoil_1 = require("recoil");
const api_1 = require("../../api");
const AllCourses_1 = require("../../assets/wrappers/AllCourses");
const atoms_1 = require("../../atoms");
const Components_1 = require("../../Components");
const Components_2 = require("../../Components");
const utils_1 = require("../../utils");
const woolfie_png_1 = __importDefault(require("../../assets/images/woolfie.png"));
const AllCourses = () => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [globalState, setGlobalCurrentState] = (0, recoil_1.useRecoilState)(atoms_1.globalCurrentState);
    const { courseNumOfPages } = (0, recoil_1.useRecoilValue)(atoms_1.globalCurrentState);
    const { courseSubjFilter, searchKeyword } = (0, recoil_1.useRecoilValue)(atoms_1.courseSearchState);
    const courseSubjSearchFilter = localStorage.getItem("courseSubjSearchFilter");
    const isDark = (0, recoil_1.useRecoilValue)(atoms_1.isDarkAtom);
    const logoutUser = (0, react_1.useCallback)(() => {
        setGlobalCurrentState((currentState) => {
            return Object.assign(Object.assign({}, currentState), { user: null, token: null });
        });
        (0, utils_1.removeUserFromLocalStorage)();
        localStorage.setItem("courseSubjSearchFilter", "AMS");
        localStorage.setItem("filterInstructor", "ALL");
        localStorage.setItem("filterSemester", "ALL");
        window.location.reload();
    }, [setGlobalCurrentState]);
    //getting the posts
    const getCourse = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        let url = `course?page=${globalState.coursePage}&subj=${courseSubjSearchFilter}`;
        if (searchKeyword) {
            url = url + `&search=${searchKeyword}`;
        }
        setIsLoading(true);
        try {
            const { data } = yield (0, api_1.authFetch)(url);
            const { allCourses, totalCourses, courseNumOfPages } = data;
            setGlobalCurrentState((currentState) => {
                return Object.assign(Object.assign({}, currentState), { allCourses,
                    totalCourses,
                    courseNumOfPages });
            });
            // console.log(data);
            setIsLoading(false);
        }
        catch (error) {
            // console.log(error.response);
            // log user out
            logoutUser();
        }
    }), [
        globalState.coursePage,
        courseSubjSearchFilter,
        searchKeyword,
        setGlobalCurrentState,
        logoutUser,
    ]);
    (0, react_1.useEffect)(() => {
        getCourse();
        localStorage.setItem("filterInstructor", "ALL");
        localStorage.setItem("filterSemester", "ALL");
        localStorage.setItem("currentCourse", JSON.stringify({ subj: "AMS", crs: "151" }));
    }, [getCourse, courseSubjFilter, searchKeyword, globalState.coursePage]);
    return (<AllCourses_1.Wrapper>
      <AllCourses_1.Main>
        <AllCourses_1.MainContent>
          <AllCourses_1.FilterRow>
            <Components_1.CourseSearch />
          </AllCourses_1.FilterRow>
          <AllCourses_1.TitleRow>
            <AllCourses_1.Title>
              {courseSubjSearchFilter === "SHCourse"
            ? "Faculty of Sciences and Humanities"
            : courseSubjSearchFilter}{" "}
              Courses
            </AllCourses_1.Title>
            <div>
              <react_router_dom_1.Link to="https://it.stonybrook.edu/services/degree-works">
                <AllCourses_1.DWBtn type="button" className="btn">
                  <AllCourses_1.WoolfieIcon src={woolfie_png_1.default}/>
                  <span>Degree Works</span>
                </AllCourses_1.DWBtn>
              </react_router_dom_1.Link>
              {courseSubjSearchFilter !== "SHCourse" && (<react_router_dom_1.Link to={courseSubjSearchFilter === "AMS"
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
                                    : ""}>
                  <AllCourses_1.ClassieBtn type="button" className="btn">
                    <AllCourses_1.WoolfieIcon src={woolfie_png_1.default}/>
                    <span>Go to Bulletin</span>
                  </AllCourses_1.ClassieBtn>
                </react_router_dom_1.Link>)}
            </div>
          </AllCourses_1.TitleRow>
          {isLoading && <Components_2.Loading center/>}
          <AllCourses_1.Courses>
            {globalState.allCourses.map((course) => {
            return (<AllCourses_1.Course key={course._id}>
                  <react_router_dom_1.Link to={`/course-manager/${course._id}`} state={{ id: course._id }}>
                    <AllCourses_1.Container>
                      <h4>
                        {course.subj}
                        {course.crs} : {course.courseTitle}
                      </h4>
                      <AllCourses_1.IconRow>
                        <AllCourses_1.Icon>
                          <AllCourses_1.Row style={{ color: isDark ? "yellow" : "blue" }}>
                            <ai_1.AiOutlineLike />
                            {course.likes.length}
                          </AllCourses_1.Row>
                        </AllCourses_1.Icon>
                      </AllCourses_1.IconRow>
                    </AllCourses_1.Container>
                  </react_router_dom_1.Link>
                </AllCourses_1.Course>);
        })}
          </AllCourses_1.Courses>
          {courseNumOfPages > 1 && <Components_1.CoursePagination />}
        </AllCourses_1.MainContent>
        <AllCourses_1.SubContent>
          <Components_1.Announcement />
        </AllCourses_1.SubContent>
      </AllCourses_1.Main>
    </AllCourses_1.Wrapper>);
};
exports.default = AllCourses;

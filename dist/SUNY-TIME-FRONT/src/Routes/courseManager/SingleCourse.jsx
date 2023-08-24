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
const bi_1 = require("react-icons/bi");
const react_router_dom_1 = require("react-router-dom");
const recoil_1 = require("recoil");
const api_1 = require("../../api");
const index_1 = require("./index");
const react_2 = require("@chakra-ui/react");
const SingleCourse_1 = require("../../assets/wrappers/SingleCourse");
const atoms_1 = require("../../atoms");
const Components_1 = require("../../Components");
const utils_1 = require("../../utils");
const woolfie_png_1 = __importDefault(require("../../assets/images/woolfie.png"));
const react_router_dom_2 = require("react-router-dom");
const SingleCourse = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [globalState, setGlobalCurrentState] = (0, recoil_1.useRecoilState)(atoms_1.globalCurrentState);
    const location = (0, react_router_dom_1.useLocation)();
    const { id } = location.state;
    const [like, setLike] = (0, react_1.useState)(true);
    const [course, setCourse] = (0, react_1.useState)();
    const setCourseReviewInstructorState = (0, recoil_1.useSetRecoilState)(atoms_1.courseReviewInstructorState);
    const isDark = (0, recoil_1.useRecoilValue)(atoms_1.isDarkAtom);
    const setCourseReview = (0, recoil_1.useSetRecoilState)(atoms_1.courseReviewsState);
    const setCurrentCourse = (0, recoil_1.useSetRecoilState)(atoms_1.currentCourseState);
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
    const getSingleCourse = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        setIsLoading(true);
        try {
            const { data } = yield (0, api_1.authFetch)(`course/${id}`);
            const { course: { _id, classNbr, subj, crs, courseTitle, sbc, cmp, sctn, credits, day, startTime, endTime, room, instructor, likes, reviews, instructor_names, semesters, }, } = data;
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
                instructor_names: instructor.length === 2
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
                }
                else if (instructor.length === 1) {
                    instructor_result = [instructor_names];
                }
                return Object.assign(Object.assign({}, currentState), { instructorNum: instructor.length, instructorName: instructor_result });
            });
            setCourseReview(reviews);
            setCurrentCourse({
                subj,
                crs,
            });
            localStorage.setItem("currentCourse", JSON.stringify({
                subj,
                crs,
            }));
            // console.log(data);
            setIsLoading(false);
        }
        catch (error) {
            // console.log(error);
            // log user out
            logoutUser();
        }
    }), [id, logoutUser]);
    const handleLike = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            setLike((prev) => !prev);
            // console.log(like);
            yield api_1.authFetch.patch(`/course?id=${id}`);
            window.location.reload();
        }
        catch (error) {
            // console.log(error);
        }
    });
    (0, react_1.useEffect)(() => {
        getSingleCourse();
    }, []);
    if (isLoading) {
        return (<SingleCourse_1.LoadingWrapper>
        <Components_1.Loading center/>
      </SingleCourse_1.LoadingWrapper>);
    }
    return (<SingleCourse_1.Wrapper>
      <SingleCourse_1.Container>
        <react_2.IconButton colorScheme={isDark ? "blackAlpha" : "gray"} onClick={() => {
            navigate(-1);
        }} aria-label="Go back" icon={<bi_1.BiArrowBack />}/>
        <SingleCourse_1.Main>
          <SingleCourse_1.Info>
            <div>
              <SingleCourse_1.Title>
                {course === null || course === void 0 ? void 0 : course.subj}
                {course === null || course === void 0 ? void 0 : course.crs} : {course === null || course === void 0 ? void 0 : course.courseTitle}
              </SingleCourse_1.Title>
              <h4>Credits: {course === null || course === void 0 ? void 0 : course.credits}</h4>
              {(course === null || course === void 0 ? void 0 : course.sbc) !== "NaN" ? <h4>SBC: {course === null || course === void 0 ? void 0 : course.sbc}</h4> : <></>}
              <h4>
                Day:{" "}
                {(course === null || course === void 0 ? void 0 : course.semesters.length) === 2
            ? `2023 Spring - ${course === null || course === void 0 ? void 0 : course.day[1]} & 2022 Fall - ${course === null || course === void 0 ? void 0 : course.day[0]}`
            : (course === null || course === void 0 ? void 0 : course.semesters.length) === 1 &&
                (course === null || course === void 0 ? void 0 : course.semesters[0]) === "2022_fall"
                ? `2022 Fall - ${course === null || course === void 0 ? void 0 : course.day[0]}`
                : (course === null || course === void 0 ? void 0 : course.semesters.length) === 1 &&
                    (course === null || course === void 0 ? void 0 : course.semesters[0]) === "2023_spring"
                    ? `2023 Spring - ${course === null || course === void 0 ? void 0 : course.day[0]}`
                    : "No day info :("}
              </h4>
              <h4>
                Time:{" "}
                {(course === null || course === void 0 ? void 0 : course.semesters.length) === 2
            ? `2023 Spring - ${course === null || course === void 0 ? void 0 : course.startTime[1]} ~ ${course === null || course === void 0 ? void 0 : course.endTime[1]} & 2022 Fall - ${course === null || course === void 0 ? void 0 : course.startTime[0]} ~ ${course === null || course === void 0 ? void 0 : course.endTime[0]}`
            : (course === null || course === void 0 ? void 0 : course.semesters.length) === 1 &&
                (course === null || course === void 0 ? void 0 : course.semesters[0]) === "2022_fall"
                ? `2022 Fall - ${course === null || course === void 0 ? void 0 : course.startTime[0]} ~ ${course === null || course === void 0 ? void 0 : course.endTime[0]}`
                : (course === null || course === void 0 ? void 0 : course.semesters.length) === 1 &&
                    (course === null || course === void 0 ? void 0 : course.semesters[0]) === "2023_spring"
                    ? `2023 Spring - ${course === null || course === void 0 ? void 0 : course.startTime[0]} ~ ${course === null || course === void 0 ? void 0 : course.endTime[0]}`
                    : "No time info :("}
              </h4>
              <h4>
                Room:{" "}
                {(course === null || course === void 0 ? void 0 : course.semesters.length) === 2
            ? `2023 Spring - ${course === null || course === void 0 ? void 0 : course.room[1]} & 2022 Fall - ${course === null || course === void 0 ? void 0 : course.room[0]}`
            : (course === null || course === void 0 ? void 0 : course.semesters.length) === 1 &&
                (course === null || course === void 0 ? void 0 : course.semesters[0]) === "2022_fall"
                ? `2022 Fall - ${course === null || course === void 0 ? void 0 : course.room[0]}`
                : (course === null || course === void 0 ? void 0 : course.semesters.length) === 1 &&
                    (course === null || course === void 0 ? void 0 : course.semesters[0]) === "2023_spring"
                    ? `2023 Spring - ${course === null || course === void 0 ? void 0 : course.room[0]}`
                    : "No room info :("}
              </h4>
              <h4>
                Instructor:{" "}
                {(course === null || course === void 0 ? void 0 : course.semesters.length) === 2
            ? `2023 Spring - ${course === null || course === void 0 ? void 0 : course.instructor_names[1]} & 2022 Fall - ${course === null || course === void 0 ? void 0 : course.instructor_names[0]}`
            : (course === null || course === void 0 ? void 0 : course.semesters.length) === 1 &&
                (course === null || course === void 0 ? void 0 : course.semesters[0]) === "2022_fall"
                ? `2022 Fall - ${course === null || course === void 0 ? void 0 : course.instructor_names[0]}`
                : (course === null || course === void 0 ? void 0 : course.semesters.length) === 1 &&
                    (course === null || course === void 0 ? void 0 : course.semesters[0]) === "2023_spring"
                    ? `2023 Spring - ${course === null || course === void 0 ? void 0 : course.instructor_names[0]}`
                    : "No instructor info :("}
              </h4>
            </div>
            <SingleCourse_1.Likes>
              <div>
                <react_2.IconButton disabled={globalState.user ? false : true} colorScheme={isDark ? "blackAlpha" : "gray"} size="lg" aria-label="Like this course?" icon={(course === null || course === void 0 ? void 0 : course.likes.includes(globalState.user._id)) ? (<ai_1.AiFillLike />) : (<ai_1.AiOutlineLike />)} onClick={() => handleLike(id)}/>
                <h4>{course === null || course === void 0 ? void 0 : course.likes.length} likes</h4>
              </div>
              <div>
                <react_router_dom_2.Link to={`https://classie-evals.stonybrook.edu/?SearchKeyword=${course === null || course === void 0 ? void 0 : course.subj}${course === null || course === void 0 ? void 0 : course.crs}&SearchTerm=ALL`}>
                  <SingleCourse_1.ClassieBtn type="button" className="btn">
                    <SingleCourse_1.WoolfieIcon src={woolfie_png_1.default}/>
                    <span>Go to Classie Eval</span>
                  </SingleCourse_1.ClassieBtn>
                </react_router_dom_2.Link>
              </div>
            </SingleCourse_1.Likes>
          </SingleCourse_1.Info>

          <react_2.Tabs isFitted variant="enclosed">
            <react_2.TabList mb="1em">
              <react_2.Tab>Overall Info</react_2.Tab>
              <react_2.Tab>Review</react_2.Tab>
              <react_2.Tab>Bulletin</react_2.Tab>
            </react_2.TabList>
            <react_2.TabPanels>
              <react_2.TabPanel>
                <index_1.OverallInfo />
              </react_2.TabPanel>
              <react_2.TabPanel>
                <index_1.Review id={id} reviews={course === null || course === void 0 ? void 0 : course.reviews} reviewsExisting={(course === null || course === void 0 ? void 0 : course.reviews.filter((review) => review.overallEvaluation !== "").length) === 0}/>
              </react_2.TabPanel>
              <react_2.TabPanel>
                <index_1.CourseBulletin id={id}/>
              </react_2.TabPanel>
            </react_2.TabPanels>
          </react_2.Tabs>
        </SingleCourse_1.Main>
      </SingleCourse_1.Container>
    </SingleCourse_1.Wrapper>);
};
exports.default = SingleCourse;

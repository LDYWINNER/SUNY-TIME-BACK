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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_2 = require("@chakra-ui/react");
const Components_1 = require("../Components");
const CourseReviewModal_1 = require("../assets/wrappers/CourseReviewModal");
// import logo from "../assets/images/navbar_logo.svg";
const react_hook_form_1 = require("react-hook-form");
const api_1 = require("../api");
const bs_1 = require("react-icons/bs");
const recoil_1 = require("recoil");
const atoms_1 = require("../atoms");
const react_router_dom_1 = require("react-router-dom");
const utils_1 = require("../utils");
const registerState = {
    formSuccess: null,
    errorMessage: "",
};
function CourseReviewModal({ id, isOpen, onClose }) {
    const toast = (0, react_2.useToast)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [globalState, setGlobalCurrentState] = (0, recoil_1.useRecoilState)(atoms_1.globalCurrentState);
    const [values, setValues] = (0, react_1.useState)(registerState);
    const [rating, setRating] = (0, react_1.useState)(0);
    const [hover, setHover] = (0, react_1.useState)(0);
    const [difficultyItems, setdifficultyItems] = (0, react_1.useState)([false, false, false]);
    const [hwQuantityItems, sethwQuantityItems] = (0, react_1.useState)([false, false, false]);
    const [testQuantityItems, setTestQuantityItems] = (0, react_1.useState)([
        false,
        false,
        false,
        false,
        false,
    ]);
    const [teamProjectPresence, setTeamProjectPresence] = (0, react_1.useState)([
        false,
        false,
    ]);
    const [quizPresence, setQuizPresence] = (0, react_1.useState)([false, false]);
    const { register, handleSubmit, reset } = (0, react_hook_form_1.useForm)({
        defaultValues: {
            anonymity: true,
            semester: "-1",
            instructor: "-2",
            myLetterGrade: "-1",
            overallGrade: undefined,
            difficulty: "",
            homeworkQuantity: "",
            testQuantity: undefined,
            teamProjectPresence: undefined,
            quizPresence: undefined,
            overallEvaluation: "",
        },
    });
    const isDark = (0, recoil_1.useRecoilValue)(atoms_1.isDarkAtom);
    const instructor = (0, recoil_1.useRecoilValue)(atoms_1.courseReviewInstructorState);
    const { subj } = (0, recoil_1.useRecoilValue)(atoms_1.currentCourseState);
    const courseSubjSearchFilter = localStorage.getItem("courseSubjSearchFilter");
    const onValid = (data) => __awaiter(this, void 0, void 0, function* () {
        const newCourseReview = {
            semester: data.semester,
            instructor: data.instructor,
            overallGrade: rating,
            difficulty: difficultyItems[0]
                ? "difficult"
                : difficultyItems[1]
                    ? "soso"
                    : difficultyItems[2]
                        ? "easy"
                        : undefined,
            homeworkQuantity: hwQuantityItems[0]
                ? "many"
                : hwQuantityItems[1]
                    ? "soso"
                    : hwQuantityItems[2]
                        ? "few"
                        : undefined,
            testQuantity: testQuantityItems[0]
                ? 0
                : testQuantityItems[1]
                    ? 1
                    : testQuantityItems[2]
                        ? 2
                        : testQuantityItems[3]
                            ? 3
                            : testQuantityItems[4]
                                ? 4
                                : undefined,
            teamProjectPresence: teamProjectPresence[0]
                ? true
                : teamProjectPresence[1]
                    ? false
                    : undefined,
            quizPresence: quizPresence[0]
                ? true
                : quizPresence[1]
                    ? false
                    : undefined,
            overallEvaluation: data.overallEvaluation,
            anonymity: data.anonymity,
            myLetterGrade: data.myLetterGrade,
        };
        // console.log(newCourseReview);
        try {
            const { data } = yield api_1.authFetch.post(`course/${id}`, newCourseReview);
            // console.log(data);
            setValues(Object.assign(Object.assign({}, values), { formSuccess: true }));
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                //clear alert
                setValues(Object.assign(Object.assign({}, values), { formSuccess: null, errorMessage: "" }));
                //close modal & refresh page
                onClose();
                const { data } = yield api_1.authFetch.patch("course/updateUserCourseNum");
                // console.log(data);
                if (globalState.user.courseReviewNum > 2) {
                    window.location.reload();
                }
                const { user, token } = data;
                setGlobalCurrentState((currentState) => {
                    return Object.assign(Object.assign({}, currentState), { token,
                        user });
                });
                //adding user to local storage
                (0, utils_1.addUserToLocalStorage)({ user, token });
                if (globalState.user.courseReviewNum < 2) {
                    localStorage.setItem("coursemanger-access", "false");
                    navigate("/course-review");
                }
                else if (Number(globalState.user.courseReviewNum) === 2) {
                    localStorage.setItem("coursemanger-access", "null");
                    navigate("/");
                    toast({
                        title: "Register Process Successfully Done!",
                        description: "Thank you. Enjoy SUNYTIME :)",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    });
                }
            }), 3000);
        }
        catch (error) {
            // console.log(error);
            if (error.response.status !== 401) {
                setValues(Object.assign(Object.assign({}, values), { formSuccess: false, errorMessage: error.response.data.msg }));
            }
            //clear alert
            setTimeout(() => {
                setValues(Object.assign(Object.assign({}, values), { formSuccess: null, errorMessage: "" }));
            }, 3000);
        }
    });
    (0, react_1.useEffect)(() => {
        if (values.formSuccess) {
            reset({
                semester: "-1",
                instructor: "-2",
                overallEvaluation: "",
            });
            setRating(0);
            setHover(0);
            setdifficultyItems([false, false, false]);
            sethwQuantityItems([false, false, false]);
            setTestQuantityItems([false, false, false, false, false]);
            setTeamProjectPresence([false, false]);
            setQuizPresence([false, false]);
        }
    }, [reset, values.formSuccess]);
    return (<>
      <react_2.Modal blockScrollOnMount={false} scrollBehavior="outside" isOpen={isOpen} onClose={onClose} size="xl">
        <react_2.ModalOverlay />
        <react_2.ModalContent>
          <CourseReviewModal_1.Wrapper>
            <form onSubmit={handleSubmit(onValid)}>
              <react_2.ModalCloseButton color={isDark ? "white" : "black"}/>
              <react_2.ModalBody>
                {/* <Logo src={logo} alt="sunytime" className="logo" /> */}

                {values.formSuccess === true && (<Components_1.Alert message="Course Review Registered!" ifSuccess={true}/>)}

                {values.formSuccess === false && (<Components_1.Alert message={values.errorMessage}/>)}

                <label htmlFor="semester" className="form-label">
                  수강학기 & 교수님
                </label>
                <select {...register("semester", { required: true })} defaultValue="-1" style={{ width: "50%" }}>
                  <option value="-1" disabled>
                    수강학기
                  </option>
                  <option value="2023-spring">2023 Spring</option>
                  <option value="2022-fall">2022 Fall</option>
                  <option value="2022-spring">2022 Spring</option>
                  <option value="2021-fall">2021 Fall</option>
                  <option value="2021-spring">2021 Spring</option>
                  <option value="2020-fall">2020 Fall</option>
                  <option value="2020-spring">2020 Spring</option>
                </select>
                <select {...register("instructor", { required: true })} defaultValue="-2" style={{ width: "50%" }}>
                  <>
                    <option value="-2" disabled>
                      교수님
                    </option>
                    {courseSubjSearchFilter === "AMS" || subj === "MAT" ? (utils_1.amsInstructors.map((instructor) => (<option key={instructor} value={instructor}>
                          {instructor}
                        </option>))) : courseSubjSearchFilter === "ACC/BUS" ? (utils_1.accbusInstructors.map((instructor) => (<option key={instructor} value={instructor}>
                          {instructor}
                        </option>))) : courseSubjSearchFilter === "CSE" ? (utils_1.cseInstructors.map((instructor) => (<option key={instructor} value={instructor}>
                          {instructor}
                        </option>))) : courseSubjSearchFilter === "ESE" ? (utils_1.eseInstructors.map((instructor) => (<option key={instructor} value={instructor}>
                          {instructor}
                        </option>))) : courseSubjSearchFilter === "EST/EMP" ? (utils_1.estempInstructors.map((instructor) => (<option key={instructor} value={instructor}>
                          {instructor}
                        </option>))) : courseSubjSearchFilter === "MEC" ? (utils_1.mecInstructors.map((instructor) => (<option key={instructor} value={instructor}>
                          {instructor}
                        </option>))) : instructor.instructorNum === 1 ? (<>
                        <option key={instructor.instructorName[0]} value={instructor.instructorName[0]}>
                          {instructor.instructorName[0]}
                        </option>
                      </>) : (<>
                        <option key={instructor.instructorName[0]} value={instructor.instructorName[0]}>
                          {instructor.instructorName[0]}
                        </option>
                        <option key={instructor.instructorName[1]} value={instructor.instructorName[1]}>
                          {instructor.instructorName[1]}
                        </option>{" "}
                      </>)}
                  </>
                </select>

                <CourseReviewModal_1.FormRow>
                  <div>
                    <label htmlFor="myLetterGrade" className="form-label">
                      받은 Letter grade (선택)
                    </label>
                    <select {...register("myLetterGrade")} defaultValue="-1">
                      <option value="-1" disabled>
                        받은 Letter grade
                      </option>
                      <option value="A">A</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B">B</option>
                      <option value="B-">B-</option>
                      <option value="C+">C+</option>
                      <option value="C">C</option>
                      <option value="C-">C-</option>
                      <option value="D+">D+</option>
                      <option value="D">D</option>
                      <option value="F">F</option>
                      <option value="I">I</option>
                      <option value="W">W</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label">총 별점</label>
                    <CourseReviewModal_1.StarRating>
                      {[...Array(5)].map((star, index) => {
            index += 1;
            return (<button type="button" key={index} className={isDark
                    ? index <= (hover || rating)
                        ? "dark-on"
                        : "off"
                    : index <= (hover || rating)
                        ? "on"
                        : "off"} onClick={() => setRating(index)} onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(rating)}>
                            <span className="star">&#9733;</span>
                          </button>);
        })}
                    </CourseReviewModal_1.StarRating>
                  </div>
                </CourseReviewModal_1.FormRow>

                <label className="form-label">난이도</label>
                <CourseReviewModal_1.Row>
                  <react_2.Checkbox borderColor={isDark ? "white" : "black"} isChecked={difficultyItems[0]} fontWeight={400} onChange={(e) => setdifficultyItems([e.target.checked, false, false])}>
                    어려움
                  </react_2.Checkbox>
                  <react_2.Checkbox borderColor={isDark ? "white" : "black"} isChecked={difficultyItems[1]} fontWeight={400} onChange={(e) => setdifficultyItems([false, e.target.checked, false])}>
                    중간
                  </react_2.Checkbox>
                  <react_2.Checkbox borderColor={isDark ? "white" : "black"} isChecked={difficultyItems[2]} fontWeight={400} onChange={(e) => setdifficultyItems([false, false, e.target.checked])}>
                    쉬움
                  </react_2.Checkbox>
                </CourseReviewModal_1.Row>

                <label className="form-label">시험 개수(미드텀 & 파이널)</label>
                <CourseReviewModal_1.Row>
                  <react_2.Checkbox borderColor={isDark ? "white" : "black"} isChecked={testQuantityItems[0]} onChange={(e) => setTestQuantityItems([
            e.target.checked,
            false,
            false,
            false,
            false,
        ])}>
                    0
                  </react_2.Checkbox>
                  <react_2.Checkbox borderColor={isDark ? "white" : "black"} isChecked={testQuantityItems[1]} onChange={(e) => setTestQuantityItems([
            false,
            e.target.checked,
            false,
            false,
            false,
        ])}>
                    1
                  </react_2.Checkbox>
                  <react_2.Checkbox borderColor={isDark ? "white" : "black"} isChecked={testQuantityItems[2]} onChange={(e) => setTestQuantityItems([
            false,
            false,
            e.target.checked,
            false,
            false,
        ])}>
                    2
                  </react_2.Checkbox>
                  <react_2.Checkbox borderColor={isDark ? "white" : "black"} isChecked={testQuantityItems[3]} onChange={(e) => setTestQuantityItems([
            false,
            false,
            false,
            e.target.checked,
            false,
        ])}>
                    3
                  </react_2.Checkbox>
                  <react_2.Checkbox borderColor={isDark ? "white" : "black"} isChecked={testQuantityItems[4]} onChange={(e) => setTestQuantityItems([
            false,
            false,
            false,
            false,
            e.target.checked,
        ])}>
                    4
                  </react_2.Checkbox>
                </CourseReviewModal_1.Row>

                <label className="form-label">과제량</label>
                <CourseReviewModal_1.Row>
                  <react_2.Checkbox borderColor={isDark ? "white" : "black"} isChecked={hwQuantityItems[0]} fontWeight={400} onChange={(e) => sethwQuantityItems([e.target.checked, false, false])}>
                    많음
                  </react_2.Checkbox>
                  <react_2.Checkbox borderColor={isDark ? "white" : "black"} isChecked={hwQuantityItems[1]} fontWeight={400} onChange={(e) => sethwQuantityItems([false, e.target.checked, false])}>
                    보통
                  </react_2.Checkbox>
                  <react_2.Checkbox borderColor={isDark ? "white" : "black"} isChecked={hwQuantityItems[2]} fontWeight={400} onChange={(e) => sethwQuantityItems([false, false, e.target.checked])}>
                    적음
                  </react_2.Checkbox>
                </CourseReviewModal_1.Row>

                <label className="form-label">팀플 유무</label>
                <CourseReviewModal_1.Row>
                  <react_2.Checkbox borderColor={isDark ? "white" : "black"} isChecked={teamProjectPresence[0]} fontWeight={400} onChange={(e) => setTeamProjectPresence([e.target.checked, false])}>
                    있음
                  </react_2.Checkbox>
                  <react_2.Checkbox borderColor={isDark ? "white" : "black"} isChecked={teamProjectPresence[1]} fontWeight={400} onChange={(e) => setTeamProjectPresence([false, e.target.checked])}>
                    없음
                  </react_2.Checkbox>
                </CourseReviewModal_1.Row>

                <label className="form-label">퀴즈 유무</label>
                <CourseReviewModal_1.Row>
                  <react_2.Checkbox borderColor={isDark ? "white" : "black"} isChecked={quizPresence[0]} fontWeight={400} onChange={(e) => setQuizPresence([e.target.checked, false])}>
                    있음
                  </react_2.Checkbox>
                  <react_2.Checkbox borderColor={isDark ? "white" : "black"} isChecked={quizPresence[1]} fontWeight={400} onChange={(e) => setQuizPresence([false, e.target.checked])}>
                    없음
                  </react_2.Checkbox>
                </CourseReviewModal_1.Row>

                <div className="form-row">
                  <CourseReviewModal_1.Row>
                    <label htmlFor="overallEvaluation" className="form-label">
                      총평
                    </label>
                    <react_2.Tooltip hasArrow label={<>
                          <p>
                            수강학기, 교수명, 별점, 난이도, 시험 횟수, 과제량,
                            조별과제 유무, 퀴즈 유무는 필수 사항입니다.
                          </p>
                          <br />
                          <p>
                            총평에는 과목에 대한 총평을 남겨주시면
                            감사하겠습니다 (점수를 잘 받기 위한 꿀팁, 무엇을
                            배우는지, 교수님에 대한 코멘트, 출석체크 방법 등).
                          </p>
                        </>}>
                      <span className="tooltip-icon">
                        <bs_1.BsQuestionCircleFill />
                      </span>
                    </react_2.Tooltip>
                  </CourseReviewModal_1.Row>
                  <textarea cols={30} className="form-input" {...register("overallEvaluation")} placeholder="코스 총평"></textarea>
                </div>
              </react_2.ModalBody>
              <react_2.ModalFooter>
                <CourseReviewModal_1.Footer>
                  <div className="checkbox-div">
                    <input type="checkbox" {...register("anonymity")} id="anonymity" className="anonymity-checkbox"/>
                    <label htmlFor="anonymity">익명</label>
                  </div>
                  <CourseReviewModal_1.Button type="submit">저장</CourseReviewModal_1.Button>
                </CourseReviewModal_1.Footer>
              </react_2.ModalFooter>
            </form>
          </CourseReviewModal_1.Wrapper>
        </react_2.ModalContent>
      </react_2.Modal>
    </>);
}
exports.default = CourseReviewModal;

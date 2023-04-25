import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { Alert } from "../Components";
import {
  Wrapper,
  Button,
  FormRow,
  Row,
  Footer,
  StarRating,
} from "../assets/wrappers/CourseReviewModal";
// import logo from "../assets/images/navbar_logo.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { authFetch } from "../api";
import { BsQuestionCircleFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  courseReviewInstructorState,
  globalCurrentState,
  isDarkAtom,
} from "../atoms";
import { useNavigate } from "react-router-dom";
import { addUserToLocalStorage } from "../utils";

interface ICourseReviewModal {
  id: any;
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  semester: string;
  instructor: string;
  myLetterGrade: string;
  overallGrade: number;
  difficulty: string;
  homeworkQuantity: string;
  testQuantity: number;
  teamProjectPresence: boolean;
  quizPresence: boolean;
  overallEvaluation: string;
  anonymity: boolean;
}

interface IRegisterState {
  formSuccess: Boolean | null;
  errorMessage: string;
}

const registerState: IRegisterState = {
  formSuccess: null,
  errorMessage: "",
};

function CourseReviewModal({ id, isOpen, onClose }: ICourseReviewModal) {
  const toast = useToast();
  const navigate = useNavigate();
  const [globalState, setGlobalCurrentState] =
    useRecoilState(globalCurrentState);
  const [values, setValues] = useState(registerState);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [difficultyItems, setdifficultyItems] = useState([false, false, false]);
  const [hwQuantityItems, sethwQuantityItems] = useState([false, false, false]);
  const [testQuantityItems, setTestQuantityItems] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [teamProjectPresence, setTeamProjectPresence] = useState([
    false,
    false,
  ]);
  const [quizPresence, setQuizPresence] = useState([false, false]);
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
    reset,
  } = useForm<IForm>({
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
  const instructor = useRecoilValue(courseReviewInstructorState);
  const isDark = useRecoilValue(isDarkAtom);

  const onValid: SubmitHandler<IForm> = async (data) => {
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
    console.log(newCourseReview);

    try {
      const { data } = await authFetch.post(`course/${id}`, newCourseReview);
      console.log(data);

      setValues({ ...values, formSuccess: true });
      setTimeout(async () => {
        //clear alert
        setValues({
          ...values,
          formSuccess: null,
          errorMessage: "",
        });
        //close modal & refresh page
        onClose();
        // window.location.reload();
        const { data } = await authFetch.patch("course/updateUserCourseNum");
        console.log(data);

        const { user, token } = data;
        setGlobalCurrentState((currentState) => {
          return {
            ...currentState,
            token,
            user,
          };
        });
        //adding user to local storage
        addUserToLocalStorage({ user, token });

        if (globalState.user.courseReviewNum < 2) {
          navigate("/course-review");
        } else {
          navigate("/");
          toast({
            title: "Register Process Successfully Done!",
            description: "Thank you. Enjoy SUNYTIME :)",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      }, 3000);
    } catch (error: any) {
      console.log(error);
      if (error.response.status !== 401) {
        setValues({
          ...values,
          formSuccess: false,
          errorMessage: error.response.data.msg,
        });
      }
      //clear alert
      setTimeout(() => {
        setValues({
          ...values,
          formSuccess: null,
          errorMessage: "",
        });
      }, 3000);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        semester: "-1",
        instructor: "-2",
        overallEvaluation: "",
      });
      setRating(0);
      setHover(0);
      setdifficultyItems([false, false, false]);
      sethwQuantityItems([false, false, false]);
      setTestQuantityItems([false, false, false, false]);
      setTeamProjectPresence([false, false]);
      setQuizPresence([false, false]);
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <>
      <Modal
        blockScrollOnMount={false}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <Wrapper>
            <form onSubmit={handleSubmit(onValid)}>
              <ModalCloseButton color={isDark ? "white" : "black"} />
              <ModalBody>
                {/* <Logo src={logo} alt="sunytime" className="logo" /> */}

                {values.formSuccess === true && (
                  <Alert message="Course Review Registered!" ifSuccess={true} />
                )}

                {values.formSuccess === false && (
                  <Alert message={values.errorMessage} />
                )}

                <label htmlFor="semester" className="form-label">
                  Semester & Instructor
                </label>
                <select
                  {...register("semester", { required: true })}
                  defaultValue="-1"
                >
                  <option value="-1" disabled>
                    SELECT SEMESTER YOU TOOK THIS COURSE
                  </option>
                  <option value="2022-fall">2022 Fall</option>
                  <option value="2022-spring">2022 Spring</option>
                  <option value="2021-fall">2021 Fall</option>
                  <option value="2021-spring">2021 Spring</option>
                  <option value="2020-fall">2020 Fall</option>
                  <option value="2020-spring">2020 Spring</option>
                  <option value="2019-fall">2019 Fall</option>
                  <option value="2019-spring">2019 Spring</option>
                  <option value="2018-fall">2018 Fall</option>
                  <option value="2018-spring">2018 Spring</option>
                </select>
                <select
                  {...register("instructor", { required: true })}
                  defaultValue="-2"
                  style={{ width: "50%" }}
                >
                  {instructor.instructorNum === 1 ? (
                    <>
                      <option value="-2" disabled>
                        SELECT INSTRUCTOR
                      </option>
                      <option value={instructor.instructorName[0]}>
                        {instructor.instructorName[0]}
                      </option>
                    </>
                  ) : (
                    <>
                      <option value="-2" disabled>
                        SELECT INSTRUCTOR
                      </option>
                      <option value={instructor.instructorName[0]}>
                        {instructor.instructorName[0]}
                      </option>
                      <option value={instructor.instructorName[1]}>
                        {instructor.instructorName[1]}
                      </option>
                    </>
                  )}
                </select>

                <FormRow>
                  <div>
                    <label htmlFor="myLetterGrade" className="form-label">
                      My Letter Grade (Optional)
                    </label>
                    <select {...register("myLetterGrade")} defaultValue="-1">
                      <option value="-1" disabled>
                        SELECT THE LETTER GRADE YOU RECEIVED
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
                    <label className="form-label">Overall Course Rating</label>
                    <StarRating>
                      {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                          <button
                            type="button"
                            key={index}
                            className={
                              index <= (hover || rating) ? "on" : "off"
                            }
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                          >
                            <span className="star">&#9733;</span>
                          </button>
                        );
                      })}
                    </StarRating>
                  </div>
                </FormRow>

                <label className="form-label">Difficulty</label>
                <Row>
                  <Checkbox
                    borderColor={isDark ? "white" : "black"}
                    isChecked={difficultyItems[0]}
                    onChange={(e) =>
                      setdifficultyItems([e.target.checked, false, false])
                    }
                  >
                    difficult
                  </Checkbox>
                  <Checkbox
                    borderColor={isDark ? "white" : "black"}
                    isChecked={difficultyItems[1]}
                    onChange={(e) =>
                      setdifficultyItems([false, e.target.checked, false])
                    }
                  >
                    soso
                  </Checkbox>
                  <Checkbox
                    borderColor={isDark ? "white" : "black"}
                    isChecked={difficultyItems[2]}
                    onChange={(e) =>
                      setdifficultyItems([false, false, e.target.checked])
                    }
                  >
                    easy
                  </Checkbox>
                </Row>

                <label className="form-label">TEST QUANTITY</label>
                <Row>
                  <Checkbox
                    borderColor={isDark ? "white" : "black"}
                    isChecked={testQuantityItems[0]}
                    onChange={(e) =>
                      setTestQuantityItems([
                        e.target.checked,
                        false,
                        false,
                        false,
                      ])
                    }
                  >
                    0
                  </Checkbox>
                  <Checkbox
                    borderColor={isDark ? "white" : "black"}
                    isChecked={testQuantityItems[1]}
                    onChange={(e) =>
                      setTestQuantityItems([
                        false,
                        e.target.checked,
                        false,
                        false,
                      ])
                    }
                  >
                    1
                  </Checkbox>
                  <Checkbox
                    borderColor={isDark ? "white" : "black"}
                    isChecked={testQuantityItems[2]}
                    onChange={(e) =>
                      setTestQuantityItems([
                        false,
                        false,
                        e.target.checked,
                        false,
                      ])
                    }
                  >
                    2
                  </Checkbox>
                  <Checkbox
                    borderColor={isDark ? "white" : "black"}
                    isChecked={testQuantityItems[3]}
                    onChange={(e) =>
                      setTestQuantityItems([
                        false,
                        false,
                        false,
                        e.target.checked,
                      ])
                    }
                  >
                    3
                  </Checkbox>
                </Row>

                <label className="form-label">HOMEWORK QUANTITY</label>
                <Row>
                  <Checkbox
                    borderColor={isDark ? "white" : "black"}
                    isChecked={hwQuantityItems[0]}
                    onChange={(e) =>
                      sethwQuantityItems([e.target.checked, false, false])
                    }
                  >
                    many
                  </Checkbox>
                  <Checkbox
                    borderColor={isDark ? "white" : "black"}
                    isChecked={hwQuantityItems[1]}
                    onChange={(e) =>
                      sethwQuantityItems([false, e.target.checked, false])
                    }
                  >
                    soso
                  </Checkbox>
                  <Checkbox
                    borderColor={isDark ? "white" : "black"}
                    isChecked={hwQuantityItems[2]}
                    onChange={(e) =>
                      sethwQuantityItems([false, false, e.target.checked])
                    }
                  >
                    few
                  </Checkbox>
                </Row>

                <label className="form-label">Team Project Presence</label>
                <Row>
                  <Checkbox
                    borderColor={isDark ? "white" : "black"}
                    isChecked={teamProjectPresence[0]}
                    onChange={(e) =>
                      setTeamProjectPresence([e.target.checked, false])
                    }
                  >
                    Yes
                  </Checkbox>
                  <Checkbox
                    borderColor={isDark ? "white" : "black"}
                    isChecked={teamProjectPresence[1]}
                    onChange={(e) =>
                      setTeamProjectPresence([false, e.target.checked])
                    }
                  >
                    No
                  </Checkbox>
                </Row>

                <label className="form-label">Quiz Presence</label>
                <Row>
                  <Checkbox
                    borderColor={isDark ? "white" : "black"}
                    isChecked={quizPresence[0]}
                    onChange={(e) => setQuizPresence([e.target.checked, false])}
                  >
                    Yes
                  </Checkbox>
                  <Checkbox
                    borderColor={isDark ? "white" : "black"}
                    isChecked={quizPresence[1]}
                    onChange={(e) => setQuizPresence([false, e.target.checked])}
                  >
                    No
                  </Checkbox>
                </Row>

                <div className="form-row">
                  <Row>
                    <label htmlFor="overallEvaluation" className="form-label">
                      Overall Evaluaiton
                    </label>
                    <Tooltip
                      hasArrow
                      label={
                        <>
                          <p>Tips for writing</p>
                          <br />
                        </>
                      }
                    >
                      <span className="tooltip-icon">
                        <BsQuestionCircleFill />
                      </span>
                    </Tooltip>
                  </Row>
                  <textarea
                    cols={30}
                    className="form-input"
                    {...register("overallEvaluation")}
                    placeholder="Overall Evaluation here"
                  ></textarea>
                </div>
              </ModalBody>
              <ModalFooter>
                <Footer>
                  <div className="checkbox-div">
                    <input
                      type="checkbox"
                      {...register("anonymity")}
                      id="anonymity"
                      className="anonymity-checkbox"
                    />
                    <label htmlFor="anonymity">Anonymity</label>
                  </div>
                  <Button type="submit">Save</Button>
                </Footer>
              </ModalFooter>
            </form>
          </Wrapper>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CourseReviewModal;

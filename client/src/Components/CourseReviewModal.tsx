import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  Checkbox,
  Tooltip,
} from "@chakra-ui/react";
import { Alert } from "../Components";
import {
  Wrapper,
  Logo,
  Button,
  FormRow,
  Row,
} from "../assets/wrappers/CourseReviewModal";
import logo from "../assets/images/navbar_logo.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { globalCurrentState } from "../atoms";
import { addUserToLocalStorage } from "../utils";
import { authFetch } from "../api";
import { BsQuestionCircleFill } from "react-icons/bs";

interface IUpdateUserModal {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  semester: string;
  instructor: string;
  overallGrade: number;
  difficulty: string;
  homeworkQuantity: string;
  testQuantity: number;
  teamProjectPresence: boolean;
  quizPresence: boolean;
  overallEvaluation: string;
}

interface IRegisterState {
  formSuccess: Boolean | null;
  errorMessage: string;
}

const registerState: IRegisterState = {
  formSuccess: null,
  errorMessage: "",
};

function CourseReviewModal({ isOpen, onClose }: IUpdateUserModal) {
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
  const setGlobalCurrentState = useSetRecoilState(globalCurrentState);
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
    reset,
  } = useForm<IForm>();

  const onValid: SubmitHandler<IForm> = async (data) => {
    const newCourseReview = {
      semester: data.semester,
      instructor: data.instructor,
      overallGrade: rating,
      difficulty: difficultyItems[0]
        ? "difficult"
        : difficultyItems[1]
        ? "soso"
        : "easy",
      homeworkQuantity: hwQuantityItems[0]
        ? "many"
        : hwQuantityItems[1]
        ? "soso"
        : "few",
      testQuantity: testQuantityItems[0]
        ? 0
        : testQuantityItems[1]
        ? 1
        : testQuantityItems[2]
        ? 2
        : 3,
      teamProjectPresence: teamProjectPresence[0] ? true : false,
      quizPresence: quizPresence[0] ? true : false,
      overallEvaluation: data.overallEvaluation,
    };
    console.log(newCourseReview);

    try {
      const { data } = await authFetch.patch(
        "/auth/updateUser",
        newCourseReview
      );
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
      setValues({ ...values, formSuccess: true });
      setTimeout(() => {
        //clear alert
        setValues({
          ...values,
          formSuccess: null,
          errorMessage: "",
        });
      }, 5000);
    } catch (error: any) {
      console.log(error.response);
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
      }, 5000);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        semester: "-1",
        instructor: "-2",
      });
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
              <ModalCloseButton />
              <ModalBody>
                <Logo src={logo} alt="sunytime" className="logo" />

                {values.formSuccess === true && (
                  <Alert message="My Profile Updated!" ifSuccess={true} />
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
                  <option value="2017-fall">2017 Fall</option>
                  <option value="2017-spring">2017 Spring</option>
                </select>
                <select
                  {...register("instructor", { required: true })}
                  defaultValue="-2"
                >
                  {true ? (
                    <>
                      <option value="-2" disabled>
                        SELECT INSTRUCTOR
                      </option>
                      <option value="1">AMS</option>
                      <option value="2">BM</option>
                      <option value="3">CS</option>
                      <option value="4">ECE</option>
                      <option value="5">MEC</option>
                      <option value="6">TSM</option>
                    </>
                  ) : (
                    <>
                      <option value="-2" disabled>
                        SELECT MAJOR
                      </option>
                      <option value="7">FBM</option>
                      <option value="8">FD</option>
                    </>
                  )}
                </select>

                <FormRow>
                  <div>
                    <label className="form-label">Overall Course Rating</label>
                    <div className="star-rating">
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
                    </div>
                  </div>

                  <div>
                    <label className="form-label">TEST QUANTITY</label>
                    <HStack mt={1} spacing={1}>
                      <Checkbox
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
                    </HStack>
                  </div>
                </FormRow>

                <FormRow>
                  <div>
                    <label className="form-label">Difficulty</label>
                    <HStack mt={1} spacing={1}>
                      <Checkbox
                        isChecked={difficultyItems[0]}
                        onChange={(e) =>
                          setdifficultyItems([e.target.checked, false, false])
                        }
                      >
                        difficult
                      </Checkbox>
                      <Checkbox
                        isChecked={difficultyItems[1]}
                        onChange={(e) =>
                          setdifficultyItems([false, e.target.checked, false])
                        }
                      >
                        soso
                      </Checkbox>
                      <Checkbox
                        isChecked={difficultyItems[2]}
                        onChange={(e) =>
                          setdifficultyItems([false, false, e.target.checked])
                        }
                      >
                        easy
                      </Checkbox>
                    </HStack>
                  </div>

                  <div>
                    <label className="form-label">HOMEWORK QUANTITY</label>
                    <HStack mt={1} spacing={1}>
                      <Checkbox
                        isChecked={hwQuantityItems[0]}
                        onChange={(e) =>
                          sethwQuantityItems([e.target.checked, false, false])
                        }
                      >
                        many
                      </Checkbox>
                      <Checkbox
                        isChecked={hwQuantityItems[1]}
                        onChange={(e) =>
                          sethwQuantityItems([false, e.target.checked, false])
                        }
                      >
                        soso
                      </Checkbox>
                      <Checkbox
                        isChecked={hwQuantityItems[2]}
                        onChange={(e) =>
                          sethwQuantityItems([false, false, e.target.checked])
                        }
                      >
                        few
                      </Checkbox>
                    </HStack>
                  </div>
                </FormRow>

                <FormRow>
                  <div>
                    <label className="form-label">Team Project Presence</label>
                    <HStack mt={1} spacing={1}>
                      <Checkbox
                        isChecked={teamProjectPresence[0]}
                        onChange={(e) =>
                          setTeamProjectPresence([e.target.checked, false])
                        }
                      >
                        Yes
                      </Checkbox>
                      <Checkbox
                        isChecked={teamProjectPresence[1]}
                        onChange={(e) =>
                          setTeamProjectPresence([false, e.target.checked])
                        }
                      >
                        No
                      </Checkbox>
                    </HStack>
                  </div>

                  <div>
                    <label className="form-label">Quiz Presence</label>
                    <HStack mt={1} spacing={1}>
                      <Checkbox
                        isChecked={quizPresence[0]}
                        onChange={(e) =>
                          setQuizPresence([e.target.checked, false])
                        }
                      >
                        Yes
                      </Checkbox>
                      <Checkbox
                        isChecked={quizPresence[1]}
                        onChange={(e) =>
                          setQuizPresence([false, e.target.checked])
                        }
                      >
                        No
                      </Checkbox>
                    </HStack>
                  </div>
                </FormRow>

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
                <Button type="submit">Save</Button>
              </ModalFooter>
            </form>
          </Wrapper>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CourseReviewModal;

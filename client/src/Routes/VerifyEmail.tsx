import { useEffect, useState } from "react";
import { Alert } from "../Components";
import logo from "../assets/images/navbar_logo.svg";
import { bgImages } from "../assets/assets";
import { Wrapper, Logo } from "../assets/wrappers/Register";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { emailConfirmationState, globalCurrentState } from "../atoms";
import { addUserToLocalStorage } from "../utils";
import { IconButton, Progress } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";

interface IForm {
  emailConfirmation: string;
}

interface IRegisterState {
  formSuccess: Boolean | null;
  errorMessage: string;
}

const registerState: IRegisterState = {
  formSuccess: null,
  errorMessage: "",
};

function VerifyEmail() {
  const navigate = useNavigate();
  const [bgImage, setbgImage] = useState("");
  const [values, setValues] = useState(registerState);
  const setGlobalCurrentState = useSetRecoilState(globalCurrentState);
  const { authNum } = useRecoilValue(emailConfirmationState);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setError,
    reset,
  } = useForm<IForm>();
  let navigateBackOrNot = false;

  const onValid: SubmitHandler<IForm> = async (data) => {
    console.log("data here");
    console.log(data);

    if (data.emailConfirmation === String(authNum)) {
      setError(
        "emailConfirmation",
        { message: "Email Confirmation Failed" },
        { shouldFocus: true }
      );
    }

    //register user
    try {
      const { data } = await axios.post("/api/v1/auth/register");
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
      //navigate back to previous page
      navigateBackOrNot = true;
      if (navigateBackOrNot) {
        setTimeout(() => {
          navigate("/course-review");
        }, 1500);
      }
    } catch (error: any) {
      console.log(error.response);
      setValues({
        ...values,
        formSuccess: false,
        errorMessage: error.response.data.msg,
      });
    }
  };

  useEffect(() => {
    setbgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
    if (isSubmitSuccessful) {
      reset({
        emailConfirmation: "",
      });
    }
  }, [bgImage, reset, isSubmitSuccessful]);

  return (
    <Wrapper className="full-page" bgImage={bgImage}>
      <form className="form" onSubmit={handleSubmit(onValid)}>
        <Logo src={logo} alt="sunytime" className="logo" />
        <h3>Register</h3>
        <Progress hasStripe value={33} />
        {values.formSuccess === true && (
          <Alert message="User created! Redirecting..." ifSuccess={true} />
        )}

        {values.formSuccess === false && (
          <Alert message={values.errorMessage} />
        )}

        {/* email confirmation */}
        <div className="form-row">
          <label htmlFor="emailConfirmation" className="form-label">
            email confirmation
          </label>
          <h4>학교 이메일로 발송된 6자리 숫자를 입력해주세요.</h4>
          <input
            type="text"
            className="form-input"
            {...register("emailConfirmation", { required: true })}
            placeholder="EMAIL CONFIRMATION"
          ></input>
        </div>

        {errors?.emailConfirmation?.message && (
          <Alert message={errors.emailConfirmation.message} />
        )}

        <button type="submit" className="btn btn-block">
          submit
        </button>

        <button
          onClick={() => {
            navigate(-1);
          }}
          className="btn btn-block"
        >
          Go back
        </button>
      </form>
    </Wrapper>
  );
}
export default VerifyEmail;

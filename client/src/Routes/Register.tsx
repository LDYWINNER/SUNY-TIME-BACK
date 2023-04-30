import { useEffect, useState } from "react";
import { FormRow, Alert } from "../Components";
import logo from "../assets/images/navbar_logo.svg";
import { bgImages } from "../assets/assets";
import { Wrapper, Logo } from "../assets/wrappers/Register";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { emailConfirmationState, globalCurrentState } from "../atoms";
import { addUserToLocalStorage } from "../utils";

interface IForm {
  username: string;
  email: string;
  school: string;
  major: string;
}

interface IRegisterState {
  isMember: Boolean;
  formSuccess: Boolean | null;
  errorMessage: string;
}

const registerState: IRegisterState = {
  isMember: true,
  formSuccess: null,
  errorMessage: "",
};

function Register() {
  const navigate = useNavigate();
  const [bgImage, setbgImage] = useState("");
  const [values, setValues] = useState(registerState);
  const setGlobalCurrentState = useSetRecoilState(globalCurrentState);
  const setEmailConfirmationState = useSetRecoilState(emailConfirmationState);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    watch,
  } = useForm<IForm>();
  let navigateBackOrNot = false;

  const onValid: SubmitHandler<IForm> = async (data) => {
    // console.log("data here");
    // console.log(data);

    const currentUser = {
      username: data.username,
      email: data.email,
      school: data.school,
      major: data.major,
    };

    const loginUser = {
      email: data.email,
    };

    if (values.isMember) {
      //login user
      try {
        const { data } = await axios.post("/api/v1/auth/login", loginUser);
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
        localStorage.setItem("courseSubjSearchFilter", "AMS");
        setValues({ ...values, formSuccess: true });
        //navigate back to previous page
        navigateBackOrNot = true;
        if (navigateBackOrNot) {
          setTimeout(() => {
            navigate(-1);
          }, 2500);
        }
      } catch (error: any) {
        // console.log(error.response);
        setValues({
          ...values,
          formSuccess: false,
          errorMessage: error.response.data.msg,
        });
      }
    } else {
      //register user
      try {
        const { data } = await axios.post(
          "/api/v1/auth/sendEmail",
          currentUser
        );
        const { authNum } = data;
        // console.log(authNum);
        setEmailConfirmationState({
          authNum,
        });
        navigate("/verify-email");
      } catch (error: any) {
        // console.log(error.response);
        setValues({
          ...values,
          formSuccess: false,
          errorMessage: error.response.data.msg,
        });
      }
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
    reset({
      username: "",
      email: "",
      school: "-1",
      major: "-2",
    });
  };

  useEffect(() => {
    setbgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
    if (isSubmitSuccessful) {
      reset({
        username: "",
        email: "",
        school: "-1",
        major: "-2",
      });
    }
  }, [bgImage, reset, isSubmitSuccessful]);

  return (
    <Wrapper className="full-page" bgImage={bgImage}>
      <form className="form" onSubmit={handleSubmit(onValid)}>
        <Logo src={logo} alt="sunytime" className="logo" />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {values.isMember && values.formSuccess === true && (
          <Alert message="Login Successful! Redirecting..." ifSuccess={true} />
        )}

        {values.formSuccess === false && (
          <Alert message={values.errorMessage} />
        )}

        {/* username input - only if register */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="username"
            labelText="username (nickname)"
            placeholder="USERNAME"
            register={register}
          />
        )}
        {errors?.username?.message && (
          <Alert message={errors.username.message} />
        )}

        {/* School and Major Input */}
        {!values.isMember && (
          <>
            <label htmlFor="school" className="form-label">
              School & Major
            </label>
            <select
              {...register("school", { required: true })}
              defaultValue="-1"
            >
              <option value="-1" disabled>
                SELECT SCHOOL
              </option>
              <option value="1">SBU</option>
              <option value="2">FIT</option>
            </select>
          </>
        )}
        {!values.isMember && (
          <select {...register("major", { required: true })} defaultValue="-2">
            {watch("school") === "1" ? (
              <>
                <option value="-2" disabled>
                  SELECT MAJOR
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
        )}
        {errors?.school?.message && <Alert message={errors.school.message} />}
        {errors?.major?.message && <Alert message={errors.major.message} />}

        {/* email input */}
        <FormRow
          type="email"
          name="email"
          labelText="email (@stonybrook only)"
          placeholder="EMAIL"
          register={register}
          validation={{
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@(stonybrook).edu$/,
              message: "Only stonybrook / fit emails allowed",
            },
          }}
        />
        {errors?.email?.message && <Alert message={errors?.email?.message} />}

        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet? " : "Already a member? "}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
export default Register;

import { useEffect, useState } from "react";
import { Header, FormRow, Alert } from "../Components";
import logo from "../assets/images/navbar_logo.svg";
import { bgImages } from "../assets/assets";
import { Wrapper, Logo } from "../assets/wrappers/Register";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { globalCurrentState } from "../atoms";

interface IForm {
  username: string;
  email: string;
  passwordLogin: string;
  passwordRegister: string;
  passwordConfirmation: string;
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
  const [bgImage, setbgImage] = useState("");
  const [values, setValues] = useState(registerState);
  const setGlobalCurrentState = useSetRecoilState(globalCurrentState);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setError,
    reset,
    watch,
  } = useForm<IForm>();

  const onValid: SubmitHandler<IForm> = async (data) => {
    //If password !== passwordConfirmation (register)
    if (
      !values.isMember &&
      data.passwordRegister !== data.passwordConfirmation
    ) {
      return setError(
        "passwordConfirmation",
        { message: "Password Confirmation Failed" },
        { shouldFocus: true }
      );
    }
    //If password includes username (register)
    if (
      !values.isMember &&
      data.username &&
      data.passwordRegister &&
      data.passwordRegister.includes(data.username)
    ) {
      return setError(
        "passwordRegister",
        { message: "Password can't include username" },
        { shouldFocus: true }
      );
    }
    console.log("data here");
    console.log(data);

    const currentUser = {
      username: data.username,
      email: data.email,
      school: data.school,
      major: data.major,
      passwordRegister: data.passwordRegister,
    };

    if (values.isMember) {
      console.log("already a member");
    } else {
      //register user
      try {
        const response = await axios.post("/api/v1/auth/register", currentUser);
        console.log(response);
        const { user, token } = response.data;
        setGlobalCurrentState((currentState) => {
          return {
            ...currentState,
            token,
            user,
          };
        });
        setValues({ ...values, formSuccess: true });
      } catch (error: any) {
        console.log(error.response);
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
      passwordLogin: "",
      passwordRegister: "",
      passwordConfirmation: "",
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
        passwordLogin: "",
        passwordRegister: "",
        passwordConfirmation: "",
      });
    }
  }, [bgImage, reset, isSubmitSuccessful]);

  return (
    <>
      <Header />
      <Wrapper className="full-page" bgImage={bgImage}>
        <form className="form" onSubmit={handleSubmit(onValid)}>
          <Logo src={logo} alt="sunytime" className="logo" />
          <h3>{values.isMember ? "Login" : "Register"}</h3>
          {values.formSuccess === true && (
            <Alert message="User created! Redirecting..." ifSuccess={true} />
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
            <select
              {...register("major", { required: true })}
              defaultValue="-2"
            >
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
            labelText="email (@stonybrook/@fitnyc only)"
            placeholder="EMAIL"
            register={register}
            validation={{
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@(stonybrook|fitnyc).edu$/,
                message: "Only stonybrook / fit emails allowed",
              },
            }}
          />
          {errors?.email?.message && <Alert message={errors?.email?.message} />}

          {/* password input for login */}
          {values.isMember && (
            <FormRow
              type="password"
              name="passwordLogin"
              placeholder="PASSWORD"
              labelText="password"
              register={register}
            />
          )}
          {errors?.passwordLogin?.message && (
            <Alert message={errors.passwordLogin.message} />
          )}

          {/* password input for Register */}
          {!values.isMember && (
            <FormRow
              type="password"
              name="passwordRegister"
              placeholder="PASSWORD"
              labelText="password"
              register={register}
              validation={{
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
                },
              }}
            />
          )}
          {errors?.passwordRegister?.message && (
            <Alert message={errors.passwordRegister.message} />
          )}

          {/* password confirmation */}
          {!values.isMember && (
            <FormRow
              type="password"
              name="passwordConfirmation"
              labelText="password confirmation"
              register={register}
              placeholder="PASSWORD CONFIRMATION"
            />
          )}
          {errors?.passwordConfirmation?.message && (
            <Alert message={errors.passwordConfirmation.message} />
          )}

          <button type="submit" className="btn btn-block">
            submit
          </button>
          <p>
            {values.isMember ? "Not a member yet?" : "Already a member?"}
            <button type="button" onClick={toggleMember} className="member-btn">
              {values.isMember ? "Register" : "Login"}
            </button>
          </p>
        </form>
      </Wrapper>
    </>
  );
}
export default Register;

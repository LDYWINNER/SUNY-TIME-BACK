import { useEffect, useState } from "react";
import { Header, FormRow, Alert } from "../Components";
import logo from "../assets/images/navbar_logo.svg";
import { bgImages } from "../assets/assets";
import { Wrapper, Logo } from "../assets/wrappers/Register";
import { useForm, SubmitHandler } from "react-hook-form";

interface IForm {
  username?: string;
  email: string;
  passwordLogin?: string;
  passwordRegister?: string;
  passwordConfirmation?: string;
}

const initialState = {
  isMember: true,
};

function Register() {
  const [bgImage, setbgImage] = useState("");
  const [values, setValues] = useState(initialState);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setError,
    reset,
  } = useForm<IForm>();

  const onValid: SubmitHandler<IForm> = (data) => {
    //If password !== passwordConfirmation (register)
    if (
      !values.isMember &&
      data.passwordRegister !== data.passwordConfirmation
    ) {
      setError(
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
      setError(
        "passwordRegister",
        { message: "Password can't include username" },
        { shouldFocus: true }
      );
    }

    console.log("Data Success");
    console.log(data);
  };
  console.log(errors);

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
    reset({
      username: "",
      email: "",
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

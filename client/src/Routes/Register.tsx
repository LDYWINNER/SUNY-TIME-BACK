import { useEffect, useState } from "react";
import { Header, FormRow, Alert } from "../Components";
import logo from "../assets/images/navbar_logo.svg";
import { bgImages } from "../assets/assets";
import { Wrapper, Logo } from "../assets/wrappers/Register";
import { useForm, SubmitHandler } from "react-hook-form";

interface IForm {
  username?: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const initialState = {
  isMember: true,
};

function Register() {
  const [bgImage, setbgImage] = useState("");
  const [values, setValues] = useState(initialState);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<IForm>();

  const onValid: SubmitHandler<IForm> = (data) => {
    console.log("Data Success");
    console.log(data);
  };
  console.log(errors);

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    setbgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
  }, [bgImage]);

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
              placeholder="username"
              register={register}
            />
          )}
          {errors?.username?.message && (
            <Alert message={errors.username.message} />
          )}

          {/* email input */}
          <FormRow
            type="email"
            name="email"
            placeholder="email"
            register={register}
            validation={{
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@(stonybrook|fitnyc).edu$/,
                message: "Only stonybrook / fit emails allowed",
              },
            }}
          />
          <span>{errors?.email?.message}</span>
          {errors?.email?.message && <Alert message={errors?.email?.message} />}

          {/* password input */}
          <FormRow
            type="password"
            name="password"
            placeholder="password"
            validation={{
              minLength: {
                value: 2,
                message: "Your password is too short",
              },
            }}
            register={register}
          />
          {errors?.password?.message && (
            <Alert message={errors.password.message} />
          )}

          {/* password confirmation */}
          {!values.isMember && (
            <FormRow
              type="password"
              name="passwordConfirmation"
              register={register}
              placeholder="password"
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

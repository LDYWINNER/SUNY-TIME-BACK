import { useEffect, useState } from "react";
import { Header, FormRow, Alert } from "../Components";
import logo from "../assets/images/navbar_logo.svg";
import { bgImages } from "../assets/assets";
import { Wrapper, Logo } from "../assets/wrappers/Register";

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConf: "",
  isMember: true,
  showAlert: true,
};

function Register() {
  const [bgImage, setbgImage] = useState("");
  const [values, setValues] = useState(initialState);

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.target);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
  };

  useEffect(() => {
    setbgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
  }, [bgImage]);

  return (
    <>
      <Header />
      <Wrapper className="full-page" bgImage={bgImage}>
        <form className="form" onSubmit={onSubmit}>
          <Logo src={logo} alt="sunytime" className="logo" />
          <h3>{values.isMember ? "Login" : "Register"}</h3>
          {values.showAlert && <Alert />}

          {!values.isMember && (
            <FormRow
              type="text"
              name="username"
              value={values.username}
              handleChange={handleChange}
            />
          )}
          {/* email input */}
          <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />
          {/* password input */}
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />
          {/* password confirmation */}
          {!values.isMember && (
            <FormRow
              type="password"
              name="password confirmation"
              value={values.passwordConf}
              handleChange={handleChange}
            />
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

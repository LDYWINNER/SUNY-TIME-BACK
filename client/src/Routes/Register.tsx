import { useEffect, useState } from "react";
import { Header, FormRow } from "../Components";
import logo from "../assets/images/navbar_logo.svg";
import { bgImages } from "../assets/assets";
import { Wrapper, Logo } from "../assets/wrappers/Register";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

function Register() {
  const [bgImage, setbgImage] = useState("");
  const [values, setValues] = useState(initialState);

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
          <h3>Login</h3>
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
          <button type="submit" className="btn btn-block">
            submit
          </button>
        </form>
      </Wrapper>
    </>
  );
}
export default Register;

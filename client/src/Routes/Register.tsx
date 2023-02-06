import { Header } from "../Components";
import logo from "../assets/images/navbar_logo.svg";
import Wrapper from "../assets/wrappers/Register";
import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

function Register() {
  const [values, setValues] = useState(initialState);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.target);
  };

  const onSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.target);
  };
  return (
    <>
      <Header />
      <Wrapper className="full-page">
        <form className="form"></form>
      </Wrapper>
    </>
  );
}
export default Register;

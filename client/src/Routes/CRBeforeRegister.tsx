import { useEffect, useState } from "react";
import { Alert } from "../Components";
import logo from "../assets/images/navbar_logo.svg";
import { bgImages } from "../assets/assets";
import { Wrapper, Logo } from "../assets/wrappers/Register";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { globalCurrentState } from "../atoms";
import { IconButton, Progress } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";

interface IForm {}

interface IRegisterState {
  formSuccess: Boolean | null;
  errorMessage: string;
}

const registerState: IRegisterState = {
  formSuccess: null,
  errorMessage: "",
};

function CRBeforeRegister() {
  const navigate = useNavigate();
  const [bgImage, setbgImage] = useState("");
  const [values, setValues] = useState(registerState);
  const setGlobalCurrentState = useSetRecoilState(globalCurrentState);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<IForm>();
  let navigateBackOrNot = false;

  const onValid: SubmitHandler<IForm> = async (data) => {
    console.log("data here");
    console.log(data);
  };

  useEffect(() => {
    setbgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
    if (isSubmitSuccessful) {
      reset({});
    }
  }, [bgImage, reset, isSubmitSuccessful]);

  return (
    <Wrapper className="full-page" bgImage={bgImage}>
      <form className="form" onSubmit={handleSubmit(onValid)}>
        <Logo src={logo} alt="sunytime" className="logo" />
        <h3>Register</h3>
        <Progress hasStripe value={66} />
        {values.formSuccess === true && (
          <Alert
            message="Registration Successful! Welcome :)"
            ifSuccess={true}
          />
        )}
        {values.formSuccess === false && (
          <Alert message={values.errorMessage} />
        )}

        {/* email confirmation */}

        <h4>Course Review</h4>

        <button type="submit" className="btn btn-block">
          submit
        </button>
      </form>
    </Wrapper>
  );
}
export default CRBeforeRegister;

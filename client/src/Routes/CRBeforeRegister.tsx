import { useEffect, useState } from "react";
import { Alert } from "../Components";
import logo from "../assets/images/navbar_logo.svg";
import { bgImages } from "../assets/assets";
import { Wrapper, Logo } from "../assets/wrappers/Register";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { globalCurrentState } from "../atoms";
import { Progress, useToast } from "@chakra-ui/react";

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
  const toast = useToast();
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
  const globalState = useRecoilValue(globalCurrentState);

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
        <h3>Course Review ({globalState.user.courseReviewNum} / 3)</h3>
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

        {/* Mandatory Course Review */}
        <h4>
          회원가입을 완료하기 위해서 저번학기에 들었던 3개의 수업에 대한
          수강평을 작성해주세요.
        </h4>

        <button
          onClick={() => {
            if (globalState.user.courseReviewNum > 2) {
              toast({
                title: "Register Successfully Done!!",
                description: "Enjoy SUNYTIME",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            }
            navigate("/course-manager");
          }}
          className="btn btn-block"
        >
          Go to Course Review
        </button>
      </form>
    </Wrapper>
  );
}
export default CRBeforeRegister;

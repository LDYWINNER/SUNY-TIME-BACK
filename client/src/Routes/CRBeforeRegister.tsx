import { useEffect, useState } from "react";
import logo from "../assets/images/navbar_logo.svg";
import { bgImages } from "../assets/assets";
import { Wrapper, Logo } from "../assets/wrappers/Register";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { globalCurrentState } from "../atoms";
import { Progress, useToast } from "@chakra-ui/react";

function CRBeforeRegister() {
  const navigate = useNavigate();
  const [bgImage, setbgImage] = useState("");
  const globalState = useRecoilValue(globalCurrentState);
  const toast = useToast();

  useEffect(() => {
    setbgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
    if (globalState.user?.courseReviewNum < 3) {
      toast({
        title: "Authentication Warning!",
        description: "You should finish your course review first :)",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    }
  }, []);

  return (
    <Wrapper className="full-page" bgImage={bgImage}>
      <form className="form">
        <Logo src={logo} alt="sunytime" className="logo" />
        <h3>Course Review ({globalState.user.courseReviewNum} / 3)</h3>
        <Progress hasStripe value={66} />

        {/* Mandatory Course Review */}
        <h4 style={{ fontFamily: "Nanum Gothic, sans-serif" }}>
          회원가입을 완료하기 위해서 저번학기에 들었던 3개의 수업에 대한
          수강평을 작성해주세요.
        </h4>

        <button
          onClick={() => {
            navigate("/course-manager");
            localStorage.setItem("coursemanger-access", "true");
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

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Tooltip,
} from "@chakra-ui/react";
import { Alert } from "../Components";
import {
  Wrapper,
  Button,
  Row,
} from "../assets/wrappers/BulletinPostPopOverContent";
import { BsQuestionCircleFill } from "react-icons/bs";
import { authFetch } from "../api";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IForm {
  title: string;
  content: string;
  existingBoard?: string;
  newBoard?: string;
  anonymity: boolean;
}

interface IBPPOCState {
  formSuccess: Boolean | null;
  errorMessage: string;
}

const BPPOCState: IBPPOCState = {
  formSuccess: null,
  errorMessage: "",
};

function BulletinPostPopOverContent() {
  const [values, setValues] = useState(BPPOCState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>({
    defaultValues: {
      title: "",
      content: "",
      anonymity: true,
      existingBoard: "-1",
      newBoard: "",
    },
  });
  const isDark = useRecoilValue(isDarkAtom);

  const onValid: SubmitHandler<IForm> = async (data) => {
    const newPost = {
      title: data.title,
      content: data.content,
      board: data.existingBoard,
      anonymity: data.anonymity,
    };
    // console.log(newPost);

    try {
      const { data } = await authFetch.post("/bulletin", newPost);
      // console.log(data);

      setValues({ ...values, formSuccess: true });
      setTimeout(() => {
        //clear alert
        setValues({
          ...values,
          formSuccess: null,
          errorMessage: "",
        });
      }, 3000);
      window.location.reload();
    } catch (error: any) {
      // console.log(error.response);
      if (error.response.status !== 401) {
        setValues({
          ...values,
          formSuccess: false,
          errorMessage: error.response.data.msg,
        });
      }
      //clear alert
      setTimeout(() => {
        setValues({
          ...values,
          formSuccess: null,
          errorMessage: "",
        });
      }, 4000);
    }
  };

  useEffect(() => {
    if (values.formSuccess) {
      reset({
        title: "",
        content: "",
        existingBoard: "-1",
        newBoard: "",
        anonymity: false,
      });
    }
  }, [reset, values.formSuccess]);

  return (
    <>
      <PopoverContent width={450}>
        <Wrapper>
          <form onSubmit={handleSubmit(onValid)}>
            <PopoverArrow />
            <PopoverCloseButton color={isDark ? "white" : "black"} />
            <PopoverHeader>Bulletin Post</PopoverHeader>
            <PopoverBody>
              {values.formSuccess === true && (
                <Alert message="Bulletin Posted!" ifSuccess={true} />
              )}

              {values.formSuccess === false && (
                <Alert message={values.errorMessage} />
              )}

              <div className="form-row">
                <label htmlFor="title" className="form-label">
                  제목
                </label>
                <input
                  type="text"
                  className="form-input"
                  {...register("title", { required: true })}
                  placeholder="제목"
                ></input>
              </div>
              {errors?.title?.message && (
                <Alert message={errors.title.message} />
              )}

              <div className="form-row">
                <Row>
                  <label htmlFor="content" className="form-label">
                    내용
                  </label>
                  <Tooltip
                    hasArrow
                    label={
                      <>
                        <p>
                          Below is an summary of key content for using the
                          bulletin board feature.
                        </p>
                        <br />
                        <p>
                          - In the case of posting illegaly filmed material, etc
                        </p>
                        <p>
                          - Acts that infringe on the rights of others or cause
                          discomfort
                        </p>
                        <p>
                          - Acts that violate law, such as criminal or illegal
                          acts
                        </p>
                        <p>
                          - Acts of writing posts including content related to
                          profanity, demeaning, discrimination, hatred, suicide,
                          and violence
                        </p>
                        <p>- Pornography, acts that cause sexual shame</p>
                      </>
                    }
                  >
                    <span className="tooltip-icon">
                      <BsQuestionCircleFill />
                    </span>
                  </Tooltip>
                </Row>
                <textarea
                  cols={30}
                  className="form-input"
                  {...register("content", { required: true })}
                  placeholder="SUNYTIME established rules to operate the community where anyone can use without any discomfort.&#13;&#10; Violations may result in postings being deleted and use of the service being permanently restricted."
                ></textarea>
              </div>
              {errors?.content?.message && (
                <Alert message={errors.content.message} />
              )}

              <label htmlFor="existingBoard" className="form-label">
                게시판 선택
              </label>
              <Row>
                <select {...register("existingBoard")} defaultValue="-1">
                  <option value="-1" disabled>
                    게시판 선택
                  </option>
                  <option value="Free">자유게시판</option>
                  <option value="Secret">비밀게시판</option>
                  <option value="Freshmen">새내기게시판</option>
                  <option value="Info">정보게시판</option>
                  <option value="Promotion">홍보게시판</option>
                  <option value="Club">동아리게시판</option>
                  <option value="Sbu">본교게시판</option>
                </select>
              </Row>
            </PopoverBody>
            <PopoverFooter>
              <div className="checkbox-div">
                <input
                  type="checkbox"
                  {...register("anonymity")}
                  id="anonymity"
                  className="anonymity-checkbox"
                />
                <label htmlFor="anonymity">익명</label>
              </div>
              <Button type="submit">저장</Button>
            </PopoverFooter>
          </form>
        </Wrapper>
      </PopoverContent>
    </>
  );
}

export default BulletinPostPopOverContent;

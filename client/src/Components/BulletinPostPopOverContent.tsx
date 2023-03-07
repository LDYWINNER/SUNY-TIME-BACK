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
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<IForm>();

  const onValid: SubmitHandler<IForm> = async (data) => {
    const newPost = {
      title: data.title,
      content: data.content,
      existingBoard: data.existingBoard,
      newBoard: data.newBoard,
      anonymity: data.anonymity,
    };
    console.log(newPost);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        title: "",
        content: "",
        existingBoard: "-1",
        newBoard: "",
        anonymity: false,
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <>
      <PopoverContent width={450}>
        <Wrapper>
          <form onSubmit={handleSubmit(onValid)}>
            <PopoverArrow />
            <PopoverCloseButton />
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
                  Title
                </label>
                <input
                  type="text"
                  className="form-input"
                  {...register("title", { required: true })}
                  placeholder="TITLE"
                ></input>
              </div>
              {errors?.title?.message && (
                <Alert message={errors.title.message} />
              )}

              <div className="form-row">
                <Row>
                  <label htmlFor="content" className="form-label">
                    Content
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
                SELECT BOARD
              </label>
              <Row>
                <select {...register("existingBoard")} defaultValue="-1">
                  <option value="-1" disabled>
                    SELECT BOARD
                  </option>
                  <option value="Free">Free</option>
                  <option value="Secret">Secret</option>
                </select>

                <div className="form-row new-board">
                  <input
                    type="text"
                    className="form-input"
                    {...register("newBoard")}
                    placeholder="NEW BOARD"
                  ></input>
                </div>
              </Row>
              {errors?.newBoard?.message && (
                <Alert message={errors.newBoard.message} />
              )}
            </PopoverBody>
            <PopoverFooter>
              <input type="checkbox" {...register("anonymity")} />
              <label htmlFor="anonymity">Anonymity</label>
              <Button type="submit">Save</Button>
            </PopoverFooter>
          </form>
        </Wrapper>
      </PopoverContent>
    </>
  );
}

export default BulletinPostPopOverContent;

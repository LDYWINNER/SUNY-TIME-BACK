import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { Alert } from "../Components";
import {
  Wrapper,
  Button,
  Row,
} from "../assets/wrappers/BulletinPostPopOverContent";

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
    watch,
  } = useForm<IForm>();

  const onValid: SubmitHandler<IForm> = async (data) => {};

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        title: "",
        content: "",
        existingBoard: "free",
        newBoard: "",
        anonymity: false,
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <>
      <PopoverContent width={450}>
        <Wrapper>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Bulletin Post</PopoverHeader>
          <PopoverBody>
            {values.formSuccess === true && (
              <Alert message="My Profile Updated!" ifSuccess={true} />
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
            {errors?.title?.message && <Alert message={errors.title.message} />}

            <div className="form-row">
              <label htmlFor="content" className="form-label">
                Content
              </label>
              <textarea
                cols={30}
                className="form-input"
                {...register("content", { required: true })}
                placeholder=""
              ></textarea>
            </div>
            {errors?.content?.message && (
              <Alert message={errors.content.message} />
            )}

            <label htmlFor="existingBoard" className="form-label">
              SELECT BOARD
            </label>
            <Row>
              <select
                {...register("existingBoard", { required: true })}
                defaultValue="-1"
              >
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
                  {...register("newBoard", { required: true })}
                  placeholder="NEW BOARD"
                ></input>
              </div>
            </Row>
            {errors?.newBoard?.message && (
              <Alert message={errors.newBoard.message} />
            )}
          </PopoverBody>
          <PopoverFooter>
            <Button type="submit">Save</Button>
          </PopoverFooter>
        </Wrapper>
      </PopoverContent>
    </>
  );
}

export default BulletinPostPopOverContent;

import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { authFetch } from "../api";
import { Button } from "../assets/wrappers/BulletinCommentPost";
import Alert from "./Alert";

interface IBulletinCommentPost {
  id: any;
}

interface IForm {
  text: string;
  anonymity: boolean;
}

interface IBCPState {
  formSuccess: Boolean | null;
  errorMessage: string;
}

const BCPState: IBCPState = {
  formSuccess: null,
  errorMessage: "",
};

function BulletinCommentPost({ id }: IBulletinCommentPost) {
  const [values, setValues] = useState(BCPState);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<IForm>({
    defaultValues: {
      text: "",
      anonymity: true,
    },
  });

  const onValid: SubmitHandler<IForm> = async (data) => {
    const newComment = {
      text: data.text,
      anonymity: data.anonymity,
    };
    console.log(newComment);

    try {
      const { data } = await authFetch.post(`bulletin/${id}`, newComment);
      console.log(data);

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
      console.log(error.response);
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
    if (isSubmitSuccessful) {
      reset({
        text: "",
        anonymity: true,
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(onValid)}>
      {values.formSuccess === true && (
        <Alert message="Comment Posted!" ifSuccess={true} />
      )}

      {values.formSuccess === false && <Alert message={values.errorMessage} />}

      <div className="form-row">
        <input
          type="text"
          className="form-input"
          {...register("text", { required: true })}
          placeholder="COMMENT"
        ></input>
      </div>
      {errors?.text?.message && <Alert message={errors.text.message} />}

      <div className="checkbox-div">
        <input
          type="checkbox"
          {...register("anonymity")}
          id="anonymity"
          className="anonymity-checkbox"
        />
        <label htmlFor="anonymity">Anonymity</label>
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}
export default BulletinCommentPost;

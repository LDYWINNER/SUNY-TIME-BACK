import { SubmitHandler, useForm } from "react-hook-form";
import { IconButton } from "@chakra-ui/react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Row } from "../assets/wrappers/BulletinSearch";
import { useSetRecoilState } from "recoil";
import { bulletinSearchState } from "../atoms";

interface IForm {
  searchKeyword?: string;
  radio: string;
}

const BulletinSearch = () => {
  const { register, handleSubmit, reset } = useForm<IForm>({});
  const setBulletinSearch = useSetRecoilState(bulletinSearchState);

  const onValid: SubmitHandler<IForm> = () => {
    //clear search
    reset({
      searchKeyword: "",
    });
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Row>
        <input
          type="text"
          className="form-input"
          {...register("searchKeyword", {
            required: true,
            onChange: (e) => {
              setBulletinSearch((currentState) => {
                return {
                  ...currentState,
                  searchKeyword: e.target.value,
                };
              });
            },
          })}
          placeholder="SEARCH"
        ></input>
        <IconButton
          type="submit"
          aria-label="Clear Search"
          icon={<RiArrowGoBackFill />}
        />
      </Row>
      <label htmlFor="Free">
        <input
          {...register("radio", {
            required: true,
            onChange: (e) => {
              setBulletinSearch((currentState) => {
                return {
                  ...currentState,
                  boardFilter: e.target.value,
                };
              });
            },
          })}
          type="radio"
          name="radio"
          value="Free"
          id="Free"
        />{" "}
        Free
      </label>
      <label htmlFor="Secret">
        <input
          {...register("radio", { required: true })}
          type="radio"
          name="radio"
          value="Secret"
          id="Secret"
        />{" "}
        Secret
      </label>
    </form>
  );
};

export default BulletinSearch;

import { SubmitHandler, useForm } from "react-hook-form";
import { IconButton } from "@chakra-ui/react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Row } from "../assets/wrappers/BulletinSearch";
import { useRecoilState, useSetRecoilState } from "recoil";
import { bulletinSearchState, globalCurrentState } from "../atoms";
import { useState, useMemo } from "react";

interface IForm {
  searchKeyword?: string;
  radio: string;
}

const BulletinSearch = () => {
  const { register, handleSubmit, reset } = useForm<IForm>({});
  const [bulletinSearch, setBulletinSearch] =
    useRecoilState(bulletinSearchState);
  const setGlobalState = useSetRecoilState(globalCurrentState);
  const [localSearch, setLocalSearch] = useState("");

  const onValid: SubmitHandler<IForm> = () => {
    //clear search
    setLocalSearch("");
    reset({
      searchKeyword: "",
    });
    window.location.reload();
  };

  const debounce = () => {
    let timeoutID: number | NodeJS.Timeout | undefined;
    return (e: any) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        setBulletinSearch((currentState) => {
          return {
            ...currentState,
            searchKeyword: e.target.value,
          };
        });
      }, 500);
    };
  };
  const optimizedDebounce = useMemo(() => debounce(), []);

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Row>
        <input
          type="text"
          className="form-input"
          {...register("searchKeyword", {
            required: true,
            value: localSearch,
            onChange: (e) => {
              //set page to 1
              setGlobalState((currentState) => {
                return {
                  ...currentState,
                  bulletinPage: 1,
                };
              });
              optimizedDebounce(e);
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
              //set page to 1
              setGlobalState((currentState) => {
                return {
                  ...currentState,
                  bulletinPage: 1,
                };
              });
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
          checked={bulletinSearch.boardFilter === "Free"}
        />{" "}
        자유게시판
      </label>
      <label htmlFor="Secret">
        <input
          {...register("radio", {
            required: true,
            onChange: (e) => {
              //set page to 1
              setGlobalState((currentState) => {
                return {
                  ...currentState,
                  bulletinPage: 1,
                };
              });
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
          value="Secret"
          id="Secret"
          checked={bulletinSearch.boardFilter === "Secret"}
        />{" "}
        비밀게시판
      </label>
      <label htmlFor="Freshmen">
        <input
          {...register("radio", {
            required: true,
            onChange: (e) => {
              //set page to 1
              setGlobalState((currentState) => {
                return {
                  ...currentState,
                  bulletinPage: 1,
                };
              });
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
          value="Freshmen"
          id="Freshmen"
          checked={bulletinSearch.boardFilter === "Freshmen"}
        />{" "}
        새내기게시판
      </label>
      <label htmlFor="Info">
        <input
          {...register("radio", {
            required: true,
            onChange: (e) => {
              //set page to 1
              setGlobalState((currentState) => {
                return {
                  ...currentState,
                  bulletinPage: 1,
                };
              });
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
          value="Info"
          id="Info"
          checked={bulletinSearch.boardFilter === "Info"}
        />{" "}
        정보게시판
      </label>
      <label htmlFor="Promotion">
        <input
          {...register("radio", {
            required: true,
            onChange: (e) => {
              //set page to 1
              setGlobalState((currentState) => {
                return {
                  ...currentState,
                  bulletinPage: 1,
                };
              });
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
          value="Promotion"
          id="Promotion"
          checked={bulletinSearch.boardFilter === "Promotion"}
        />{" "}
        홍보게시판
      </label>
      <label htmlFor="Club">
        <input
          {...register("radio", {
            required: true,
            onChange: (e) => {
              //set page to 1
              setGlobalState((currentState) => {
                return {
                  ...currentState,
                  bulletinPage: 1,
                };
              });
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
          value="Club"
          id="Club"
          checked={bulletinSearch.boardFilter === "Club"}
        />{" "}
        동아리게시판
      </label>
    </form>
  );
};

export default BulletinSearch;

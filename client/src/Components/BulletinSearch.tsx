import { SubmitHandler, useForm } from "react-hook-form";
import { IconButton } from "@chakra-ui/react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useRecoilState, useSetRecoilState } from "recoil";
import { bulletinSearchState, globalCurrentState } from "../atoms";
import { useState, useMemo } from "react";
import { Wrapper, Row, Filters } from "../assets/wrappers/BulletinSearch";

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
    <Wrapper>
      <form onSubmit={handleSubmit(onValid)}>
        <Row>
          <input
            type="text"
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
            style={{ height: "40px" }}
          />
        </Row>

        <Filters>
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
          />
          <label htmlFor="Free">자유게시판</label>
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
            value="courseRegister"
            id="courseRegister"
            checked={bulletinSearch.boardFilter === "courseRegister"}
          />
          <label htmlFor="courseRegister">수강신청게시판</label>
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
          />
          <label htmlFor="Secret">비밀게시판</label>
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
          <label htmlFor="Freshmen">새내기게시판</label>
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
          />
          <label htmlFor="Promotion">홍보게시판</label>
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
          />
          <label htmlFor="Club">동아리게시판</label>
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
            value="Sbu"
            id="Sbu"
            checked={bulletinSearch.boardFilter === "Sbu"}
          />
          <label htmlFor="Sbu">본교게시판</label>
        </Filters>
      </form>
    </Wrapper>
  );
};

export default BulletinSearch;

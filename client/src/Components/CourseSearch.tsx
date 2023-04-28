import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { courseSearchState, globalCurrentState, isDarkAtom } from "../atoms";
import { IconButton } from "@chakra-ui/react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Wrapper, Row, Filters } from "../assets/wrappers/CourseSearch";

interface IForm {
  searchKeyword?: string;
  radio: string;
}

const CourseSearch = () => {
  const { register, handleSubmit, reset } = useForm<IForm>({});
  const [courseSearch, setCourseSearch] = useRecoilState(courseSearchState);
  const setGlobalState = useSetRecoilState(globalCurrentState);
  const [localSearch, setLocalSearch] = useState("");
  const isDark = useRecoilValue(isDarkAtom);
  const courseSubjSearchFilter = localStorage.getItem("courseSubjSearchFilter");

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
        setCourseSearch((currentState) => {
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
                    coursePage: 1,
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
            style={{
              height: "40px",
              color: isDark ? "#fff" : "#2F2F2F",
              backgroundColor: isDark ? "#2F2F2F" : "#fff",
            }}
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
                    coursePage: 1,
                  };
                });
                setCourseSearch((currentState) => {
                  return {
                    ...currentState,
                    courseSubjFilter: e.target.value,
                  };
                });
                localStorage.setItem("courseSubjSearchFilter", e.target.value);
              },
            })}
            type="radio"
            name="radio"
            value="AMS"
            id="AMS"
            checked={courseSubjSearchFilter === "AMS"}
          />
          <label htmlFor="AMS">AMS</label>
          <input
            {...register("radio", {
              required: true,
              onChange: (e) => {
                //set page to 1
                setGlobalState((currentState) => {
                  return {
                    ...currentState,
                    coursePage: 1,
                  };
                });
                setCourseSearch((currentState) => {
                  return {
                    ...currentState,
                    courseSubjFilter: e.target.value,
                  };
                });
                localStorage.setItem("courseSubjSearchFilter", e.target.value);
              },
            })}
            type="radio"
            name="radio"
            value="ACC/BUS"
            id="ACC/BUS"
            checked={courseSubjSearchFilter === "ACC/BUS"}
          />
          <label htmlFor="ACC/BUS">ACC/BUS</label>
          <input
            {...register("radio", {
              required: true,
              onChange: (e) => {
                //set page to 1
                setGlobalState((currentState) => {
                  return {
                    ...currentState,
                    coursePage: 1,
                  };
                });
                setCourseSearch((currentState) => {
                  return {
                    ...currentState,
                    courseSubjFilter: e.target.value,
                  };
                });
                localStorage.setItem("courseSubjSearchFilter", e.target.value);
              },
            })}
            type="radio"
            name="radio"
            value="CSE"
            id="CSE"
            checked={courseSubjSearchFilter === "CSE"}
          />
          <label htmlFor="CSE">CSE</label>
          <input
            {...register("radio", {
              required: true,
              onChange: (e) => {
                //set page to 1
                setGlobalState((currentState) => {
                  return {
                    ...currentState,
                    coursePage: 1,
                  };
                });
                setCourseSearch((currentState) => {
                  return {
                    ...currentState,
                    courseSubjFilter: e.target.value,
                  };
                });
                localStorage.setItem("courseSubjSearchFilter", e.target.value);
              },
            })}
            type="radio"
            name="radio"
            value="ESE"
            id="ESE"
            checked={courseSubjSearchFilter === "ESE"}
          />
          <label htmlFor="ESE">ESE</label>
          <input
            {...register("radio", {
              required: true,
              onChange: (e) => {
                //set page to 1
                setGlobalState((currentState) => {
                  return {
                    ...currentState,
                    coursePage: 1,
                  };
                });
                setCourseSearch((currentState) => {
                  return {
                    ...currentState,
                    courseSubjFilter: e.target.value,
                  };
                });
                localStorage.setItem("courseSubjSearchFilter", e.target.value);
              },
            })}
            type="radio"
            name="radio"
            value="EST/EMP"
            id="EST/EMP"
            checked={courseSubjSearchFilter === "EST/EMP"}
          />
          <label htmlFor="EST/EMP">EST/EMP</label>
          <input
            {...register("radio", {
              required: true,
              onChange: (e) => {
                //set page to 1
                setGlobalState((currentState) => {
                  return {
                    ...currentState,
                    coursePage: 1,
                  };
                });
                setCourseSearch((currentState) => {
                  return {
                    ...currentState,
                    courseSubjFilter: e.target.value,
                  };
                });
                localStorage.setItem("courseSubjSearchFilter", e.target.value);
              },
            })}
            type="radio"
            name="radio"
            value="MEC"
            id="MEC"
            checked={courseSubjSearchFilter === "MEC"}
          />
          <label htmlFor="MEC">MEC</label>
          <input
            {...register("radio", {
              required: true,
              onChange: (e) => {
                //set page to 1
                setGlobalState((currentState) => {
                  return {
                    ...currentState,
                    coursePage: 1,
                  };
                });
                setCourseSearch((currentState) => {
                  return {
                    ...currentState,
                    courseSubjFilter: e.target.value,
                  };
                });
                localStorage.setItem("courseSubjSearchFilter", e.target.value);
              },
            })}
            type="radio"
            name="radio"
            value="SHCourse"
            id="SHCourse"
            checked={courseSubjSearchFilter === "SHCourse"}
          />
          <label htmlFor="SHCourse">교양/Writing</label>
        </Filters>
      </form>
    </Wrapper>
  );
};
export default CourseSearch;

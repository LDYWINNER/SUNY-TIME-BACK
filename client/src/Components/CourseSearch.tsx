import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { courseSearchState, globalCurrentState } from "../atoms";
import { IconButton } from "@chakra-ui/react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Row } from "../assets/wrappers/BulletinSearch";

interface IForm {
  searchKeyword?: string;
  radio: string;
}

const CourseSearch = () => {
  const { register, handleSubmit, reset } = useForm<IForm>({});
  const [courseSearch, setCourseSearch] = useRecoilState(courseSearchState);
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
        />
      </Row>
      <label htmlFor="AMS">
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
            },
          })}
          type="radio"
          name="radio"
          value="AMS"
          id="AMS"
          checked={courseSearch.courseSubjFilter === "AMS"}
        />{" "}
        AMS
      </label>
      <label htmlFor="ACC/BUS">
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
            },
          })}
          type="radio"
          name="radio"
          value="ACC/BUS"
          id="ACC/BUS"
          checked={courseSearch.courseSubjFilter === "ACC/BUS"}
        />{" "}
        ACC / BUS
      </label>
      <label htmlFor="CSE">
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
            },
          })}
          type="radio"
          name="radio"
          value="CSE"
          id="CSE"
          checked={courseSearch.courseSubjFilter === "CSE"}
        />{" "}
        CSE
      </label>
      <label htmlFor="ESE">
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
            },
          })}
          type="radio"
          name="radio"
          value="ESE"
          id="ESE"
          checked={courseSearch.courseSubjFilter === "ESE"}
        />{" "}
        ESE
      </label>
      <label htmlFor="EST/EMP">
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
            },
          })}
          type="radio"
          name="radio"
          value="EST/EMP"
          id="EST/EMP"
          checked={courseSearch.courseSubjFilter === "EST/EMP"}
        />{" "}
        EST / EMP
      </label>
      <label htmlFor="MEC">
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
            },
          })}
          type="radio"
          name="radio"
          value="MEC"
          id="MEC"
          checked={courseSearch.courseSubjFilter === "MEC"}
        />{" "}
        MEC
      </label>
      <label htmlFor="SHCourse">
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
            },
          })}
          type="radio"
          name="radio"
          value="Faculty of Sciences and Humanities"
          id="SHCourse"
          checked={courseSearch.courseSubjFilter === "SHCourse"}
        />{" "}
        Faculty of Sciences and Humanities Courses
      </label>
    </form>
  );
};
export default CourseSearch;

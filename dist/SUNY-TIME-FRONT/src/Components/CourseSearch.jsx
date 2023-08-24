"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const recoil_1 = require("recoil");
const atoms_1 = require("../atoms");
const react_2 = require("@chakra-ui/react");
const ri_1 = require("react-icons/ri");
const CourseSearch_1 = require("../assets/wrappers/CourseSearch");
const CourseSearch = () => {
    const { register, handleSubmit, reset } = (0, react_hook_form_1.useForm)({});
    const [courseSearch, setCourseSearch] = (0, recoil_1.useRecoilState)(atoms_1.courseSearchState);
    const setGlobalState = (0, recoil_1.useSetRecoilState)(atoms_1.globalCurrentState);
    const [localSearch, setLocalSearch] = (0, react_1.useState)("");
    const isDark = (0, recoil_1.useRecoilValue)(atoms_1.isDarkAtom);
    const courseSubjSearchFilter = localStorage.getItem("courseSubjSearchFilter");
    const onValid = () => {
        //clear search
        setLocalSearch("");
        reset({
            searchKeyword: "",
        });
        window.location.reload();
    };
    const debounce = () => {
        let timeoutID;
        return (e) => {
            setLocalSearch(e.target.value);
            clearTimeout(timeoutID);
            timeoutID = setTimeout(() => {
                setCourseSearch((currentState) => {
                    return Object.assign(Object.assign({}, currentState), { searchKeyword: e.target.value });
                });
            }, 500);
        };
    };
    const optimizedDebounce = (0, react_1.useMemo)(() => debounce(), []);
    return (<CourseSearch_1.Wrapper>
      <form onSubmit={handleSubmit(onValid)}>
        <CourseSearch_1.Row>
          <input type="text" {...register("searchKeyword", {
        required: true,
        value: localSearch,
        onChange: (e) => {
            //set page to 1
            setGlobalState((currentState) => {
                return Object.assign(Object.assign({}, currentState), { coursePage: 1 });
            });
            optimizedDebounce(e);
        },
    })} placeholder="SEARCH"></input>
          <react_2.IconButton type="submit" aria-label="Clear Search" icon={<ri_1.RiArrowGoBackFill />} style={{
            height: "40px",
            color: isDark ? "#fff" : "#2F2F2F",
            backgroundColor: isDark ? "#2F2F2F" : "#fff",
        }}/>
        </CourseSearch_1.Row>

        <CourseSearch_1.Filters>
          <input {...register("radio", {
        required: true,
        onChange: (e) => {
            //set page to 1
            setGlobalState((currentState) => {
                return Object.assign(Object.assign({}, currentState), { coursePage: 1 });
            });
            setCourseSearch((currentState) => {
                return Object.assign(Object.assign({}, currentState), { courseSubjFilter: e.target.value });
            });
            localStorage.setItem("courseSubjSearchFilter", e.target.value);
        },
    })} type="radio" name="radio" value="AMS" id="AMS" checked={courseSubjSearchFilter === "AMS"}/>
          <label htmlFor="AMS">AMS</label>
          <input {...register("radio", {
        required: true,
        onChange: (e) => {
            //set page to 1
            setGlobalState((currentState) => {
                return Object.assign(Object.assign({}, currentState), { coursePage: 1 });
            });
            setCourseSearch((currentState) => {
                return Object.assign(Object.assign({}, currentState), { courseSubjFilter: e.target.value });
            });
            localStorage.setItem("courseSubjSearchFilter", e.target.value);
        },
    })} type="radio" name="radio" value="ACC/BUS" id="ACC/BUS" checked={courseSubjSearchFilter === "ACC/BUS"}/>
          <label htmlFor="ACC/BUS">ACC/BUS</label>
          <input {...register("radio", {
        required: true,
        onChange: (e) => {
            //set page to 1
            setGlobalState((currentState) => {
                return Object.assign(Object.assign({}, currentState), { coursePage: 1 });
            });
            setCourseSearch((currentState) => {
                return Object.assign(Object.assign({}, currentState), { courseSubjFilter: e.target.value });
            });
            localStorage.setItem("courseSubjSearchFilter", e.target.value);
        },
    })} type="radio" name="radio" value="CSE" id="CSE" checked={courseSubjSearchFilter === "CSE"}/>
          <label htmlFor="CSE">CSE</label>
          <input {...register("radio", {
        required: true,
        onChange: (e) => {
            //set page to 1
            setGlobalState((currentState) => {
                return Object.assign(Object.assign({}, currentState), { coursePage: 1 });
            });
            setCourseSearch((currentState) => {
                return Object.assign(Object.assign({}, currentState), { courseSubjFilter: e.target.value });
            });
            localStorage.setItem("courseSubjSearchFilter", e.target.value);
        },
    })} type="radio" name="radio" value="ESE" id="ESE" checked={courseSubjSearchFilter === "ESE"}/>
          <label htmlFor="ESE">ESE</label>
          <input {...register("radio", {
        required: true,
        onChange: (e) => {
            //set page to 1
            setGlobalState((currentState) => {
                return Object.assign(Object.assign({}, currentState), { coursePage: 1 });
            });
            setCourseSearch((currentState) => {
                return Object.assign(Object.assign({}, currentState), { courseSubjFilter: e.target.value });
            });
            localStorage.setItem("courseSubjSearchFilter", e.target.value);
        },
    })} type="radio" name="radio" value="EST/EMP" id="EST/EMP" checked={courseSubjSearchFilter === "EST/EMP"}/>
          <label htmlFor="EST/EMP">EST/EMP</label>
          <input {...register("radio", {
        required: true,
        onChange: (e) => {
            //set page to 1
            setGlobalState((currentState) => {
                return Object.assign(Object.assign({}, currentState), { coursePage: 1 });
            });
            setCourseSearch((currentState) => {
                return Object.assign(Object.assign({}, currentState), { courseSubjFilter: e.target.value });
            });
            localStorage.setItem("courseSubjSearchFilter", e.target.value);
        },
    })} type="radio" name="radio" value="MEC" id="MEC" checked={courseSubjSearchFilter === "MEC"}/>
          <label htmlFor="MEC">MEC</label>
          <input {...register("radio", {
        required: true,
        onChange: (e) => {
            //set page to 1
            setGlobalState((currentState) => {
                return Object.assign(Object.assign({}, currentState), { coursePage: 1 });
            });
            setCourseSearch((currentState) => {
                return Object.assign(Object.assign({}, currentState), { courseSubjFilter: e.target.value });
            });
            localStorage.setItem("courseSubjSearchFilter", e.target.value);
        },
    })} type="radio" name="radio" value="SHCourse" id="SHCourse" checked={courseSubjSearchFilter === "SHCourse"}/>
          <label htmlFor="SHCourse">교양/Writing</label>
        </CourseSearch_1.Filters>
      </form>
    </CourseSearch_1.Wrapper>);
};
exports.default = CourseSearch;

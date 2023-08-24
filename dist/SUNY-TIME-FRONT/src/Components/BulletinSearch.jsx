"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_hook_form_1 = require("react-hook-form");
const react_1 = require("@chakra-ui/react");
const ri_1 = require("react-icons/ri");
const recoil_1 = require("recoil");
const atoms_1 = require("../atoms");
const react_2 = require("react");
const BulletinSearch_1 = require("../assets/wrappers/BulletinSearch");
const BulletinSearch = () => {
    const { register, handleSubmit, reset } = (0, react_hook_form_1.useForm)({});
    const [bulletinSearch, setBulletinSearch] = (0, recoil_1.useRecoilState)(atoms_1.bulletinSearchState);
    const setGlobalState = (0, recoil_1.useSetRecoilState)(atoms_1.globalCurrentState);
    const [localSearch, setLocalSearch] = (0, react_2.useState)("");
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
                setBulletinSearch((currentState) => {
                    return Object.assign(Object.assign({}, currentState), { searchKeyword: e.target.value });
                });
            }, 500);
        };
    };
    const optimizedDebounce = (0, react_2.useMemo)(() => debounce(), []);
    return (<BulletinSearch_1.Wrapper>
      <form onSubmit={handleSubmit(onValid)}>
        <BulletinSearch_1.Row>
          <input type="text" {...register("searchKeyword", {
        required: true,
        value: localSearch,
        onChange: (e) => {
            //set page to 1
            setGlobalState((currentState) => {
                return Object.assign(Object.assign({}, currentState), { bulletinPage: 1 });
            });
            optimizedDebounce(e);
        },
    })} placeholder="SEARCH"></input>
          <react_1.IconButton type="submit" aria-label="Clear Search" icon={<ri_1.RiArrowGoBackFill />} style={{ height: "40px" }}/>
        </BulletinSearch_1.Row>

        <BulletinSearch_1.Filters>
          <input {...register("radio", {
        required: true,
        onChange: (e) => {
            //set page to 1
            setGlobalState((currentState) => {
                return Object.assign(Object.assign({}, currentState), { bulletinPage: 1 });
            });
            setBulletinSearch((currentState) => {
                return Object.assign(Object.assign({}, currentState), { boardFilter: e.target.value });
            });
        },
    })} type="radio" name="radio" value="Free" id="Free" checked={bulletinSearch.boardFilter === "Free"}/>
          <label htmlFor="Free">자유게시판</label>
          <input {...register("radio", {
        required: true,
        onChange: (e) => {
            //set page to 1
            setGlobalState((currentState) => {
                return Object.assign(Object.assign({}, currentState), { bulletinPage: 1 });
            });
            setBulletinSearch((currentState) => {
                return Object.assign(Object.assign({}, currentState), { boardFilter: e.target.value });
            });
        },
    })} type="radio" name="radio" value="courseRegister" id="courseRegister" checked={bulletinSearch.boardFilter === "courseRegister"}/>
          <label htmlFor="courseRegister">수강신청게시판</label>
          <input {...register("radio", {
        required: true,
        onChange: (e) => {
            //set page to 1
            setGlobalState((currentState) => {
                return Object.assign(Object.assign({}, currentState), { bulletinPage: 1 });
            });
            setBulletinSearch((currentState) => {
                return Object.assign(Object.assign({}, currentState), { boardFilter: e.target.value });
            });
        },
    })} type="radio" name="radio" value="Secret" id="Secret" checked={bulletinSearch.boardFilter === "Secret"}/>
          <label htmlFor="Secret">비밀게시판</label>
          <input {...register("radio", {
        required: true,
        onChange: (e) => {
            //set page to 1
            setGlobalState((currentState) => {
                return Object.assign(Object.assign({}, currentState), { bulletinPage: 1 });
            });
            setBulletinSearch((currentState) => {
                return Object.assign(Object.assign({}, currentState), { boardFilter: e.target.value });
            });
        },
    })} type="radio" name="radio" value="Freshmen" id="Freshmen" checked={bulletinSearch.boardFilter === "Freshmen"}/>{" "}
          <label htmlFor="Freshmen">새내기게시판</label>
          <input {...register("radio", {
        required: true,
        onChange: (e) => {
            //set page to 1
            setGlobalState((currentState) => {
                return Object.assign(Object.assign({}, currentState), { bulletinPage: 1 });
            });
            setBulletinSearch((currentState) => {
                return Object.assign(Object.assign({}, currentState), { boardFilter: e.target.value });
            });
        },
    })} type="radio" name="radio" value="Promotion" id="Promotion" checked={bulletinSearch.boardFilter === "Promotion"}/>
          <label htmlFor="Promotion">홍보게시판</label>
          <input {...register("radio", {
        required: true,
        onChange: (e) => {
            //set page to 1
            setGlobalState((currentState) => {
                return Object.assign(Object.assign({}, currentState), { bulletinPage: 1 });
            });
            setBulletinSearch((currentState) => {
                return Object.assign(Object.assign({}, currentState), { boardFilter: e.target.value });
            });
        },
    })} type="radio" name="radio" value="Club" id="Club" checked={bulletinSearch.boardFilter === "Club"}/>
          <label htmlFor="Club">동아리게시판</label>
          <input {...register("radio", {
        required: true,
        onChange: (e) => {
            //set page to 1
            setGlobalState((currentState) => {
                return Object.assign(Object.assign({}, currentState), { bulletinPage: 1 });
            });
            setBulletinSearch((currentState) => {
                return Object.assign(Object.assign({}, currentState), { boardFilter: e.target.value });
            });
        },
    })} type="radio" name="radio" value="Sbu" id="Sbu" checked={bulletinSearch.boardFilter === "Sbu"}/>
          <label htmlFor="Sbu">본교게시판</label>
        </BulletinSearch_1.Filters>
      </form>
    </BulletinSearch_1.Wrapper>);
};
exports.default = BulletinSearch;

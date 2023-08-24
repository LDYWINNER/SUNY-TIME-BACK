"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Components_1 = require("../Components");
const navbar_logo_svg_1 = __importDefault(require("../assets/images/navbar_logo.svg"));
const assets_1 = require("../assets/assets");
const Register_1 = require("../assets/wrappers/Register");
const react_hook_form_1 = require("react-hook-form");
const axios_1 = __importDefault(require("axios"));
const react_router_dom_1 = require("react-router-dom");
const recoil_1 = require("recoil");
const atoms_1 = require("../atoms");
const utils_1 = require("../utils");
const registerState = {
    isMember: true,
    formSuccess: null,
    errorMessage: "",
};
function Register() {
    var _a, _b, _c, _d, _e;
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [bgImage, setbgImage] = (0, react_1.useState)("");
    const [values, setValues] = (0, react_1.useState)(registerState);
    const setEmailConfirmationState = (0, recoil_1.useSetRecoilState)(atoms_1.emailConfirmationState);
    const setLoginConfirmationState = (0, recoil_1.useSetRecoilState)(atoms_1.loginConfirmationState);
    const setGlobalCurrentState = (0, recoil_1.useSetRecoilState)(atoms_1.globalCurrentState);
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset, watch, } = (0, react_hook_form_1.useForm)();
    const onValid = (data) => __awaiter(this, void 0, void 0, function* () {
        // console.log("data here");
        // console.log(data);
        const currentUser = {
            username: data.username,
            email: data.email.toLowerCase(),
            school: data.school,
            major: data.major,
        };
        const loginUser = {
            email: data.email,
        };
        if (values.isMember) {
            //login user
            try {
                const { data } = yield axios_1.default.post("/api/v1/auth/loginEmail", loginUser);
                const { authNum, loginSkip } = data;
                // console.log(authNum, loginSkip);
                if (loginSkip) {
                    //login user
                    try {
                        const { data } = yield axios_1.default.post("/api/v1/auth/login");
                        const { user, token } = data;
                        setGlobalCurrentState((currentState) => {
                            return Object.assign(Object.assign({}, currentState), { token,
                                user });
                        });
                        //adding user to local storage
                        (0, utils_1.addUserToLocalStorage)({ user, token });
                        localStorage.setItem("courseSubjSearchFilter", "AMS");
                        setValues(Object.assign(Object.assign({}, values), { formSuccess: true }));
                        setTimeout(() => {
                            navigate("/");
                        }, 2500);
                    }
                    catch (error) {
                        // console.log(error.response);
                        setValues(Object.assign(Object.assign({}, values), { formSuccess: false, errorMessage: error.response.data.msg }));
                    }
                    setLoginConfirmationState({
                        authNum,
                    });
                }
                else {
                    setLoginConfirmationState({
                        authNum,
                    });
                    navigate("/login-email");
                }
            }
            catch (error) {
                // console.log(error.response);
                setValues(Object.assign(Object.assign({}, values), { formSuccess: false, errorMessage: error.response.data.msg }));
            }
        }
        else {
            //register user
            try {
                const { data } = yield axios_1.default.post("/api/v1/auth/sendEmail", currentUser);
                const { authNum } = data;
                // console.log(authNum);
                setEmailConfirmationState({
                    authNum,
                });
                navigate("/verify-email");
            }
            catch (error) {
                // console.log(error.response);
                setValues(Object.assign(Object.assign({}, values), { formSuccess: false, errorMessage: error.response.data.msg }));
            }
        }
    });
    const toggleMember = () => {
        setValues(Object.assign(Object.assign({}, values), { isMember: !values.isMember }));
        reset({
            username: "",
            email: "",
            school: "-1",
            major: "-2",
        });
    };
    (0, react_1.useEffect)(() => {
        setbgImage(assets_1.bgImages[Math.floor(Math.random() * assets_1.bgImages.length)]);
        if (isSubmitSuccessful) {
            reset({
                username: "",
                email: "",
                school: "-1",
                major: "-2",
            });
        }
    }, [bgImage, reset, isSubmitSuccessful]);
    return (<Register_1.Wrapper className="full-page" bgImage={bgImage}>
      <form className="form" onSubmit={handleSubmit(onValid)}>
        <Register_1.Logo src={navbar_logo_svg_1.default} alt="sunytime" className="logo"/>
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {values.isMember && values.formSuccess === true && (<Components_1.Alert message="Login Successful! Redirecting..." ifSuccess={true}/>)}

        {values.formSuccess === false && (<Components_1.Alert message={values.errorMessage}/>)}

        {/* username input - only if register */}
        {!values.isMember && (<Components_1.FormRow type="text" name="username" labelText="username (nickname)" placeholder="USERNAME" register={register}/>)}
        {((_a = errors === null || errors === void 0 ? void 0 : errors.username) === null || _a === void 0 ? void 0 : _a.message) && (<Components_1.Alert message={errors.username.message}/>)}

        {/* School and Major Input */}
        {!values.isMember && (<>
            <label htmlFor="school" className="form-label">
              School & Major
            </label>
            <select {...register("school", { required: true })} defaultValue="-1">
              <option value="-1" disabled>
                SELECT SCHOOL
              </option>
              <option value="1">SBU</option>
              {/* <option value="2">FIT</option> */}
            </select>
          </>)}
        {!values.isMember && (<select {...register("major", { required: true })} defaultValue="-2">
            {watch("school") === "1" ? (<>
                <option value="-2" disabled>
                  SELECT MAJOR
                </option>
                <option value="1">AMS</option>
                <option value="2">BM</option>
                <option value="3">CS</option>
                <option value="4">ECE</option>
                <option value="5">MEC</option>
                <option value="6">TSM</option>
              </>) : (<>
                <option value="-2" disabled>
                  SELECT MAJOR
                </option>
                <option value="7">FBM</option>
                <option value="8">FD</option>
              </>)}
          </select>)}
        {((_b = errors === null || errors === void 0 ? void 0 : errors.school) === null || _b === void 0 ? void 0 : _b.message) && <Components_1.Alert message={errors.school.message}/>}
        {((_c = errors === null || errors === void 0 ? void 0 : errors.major) === null || _c === void 0 ? void 0 : _c.message) && <Components_1.Alert message={errors.major.message}/>}

        {/* email input */}
        <Components_1.FormRow type="email" name="email" labelText="email (@stonybrook only)" placeholder="EMAIL" register={register} validation={{
            pattern: {
                value: /^[A-Za-z0-9._%+-]+@(stonybrook).edu$/,
                message: "Only stonybrook / fit emails allowed",
            },
        }}/>
        {((_d = errors === null || errors === void 0 ? void 0 : errors.email) === null || _d === void 0 ? void 0 : _d.message) && <Components_1.Alert message={(_e = errors === null || errors === void 0 ? void 0 : errors.email) === null || _e === void 0 ? void 0 : _e.message}/>}

        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet? " : "Already a member? "}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Register_1.Wrapper>);
}
exports.default = Register;

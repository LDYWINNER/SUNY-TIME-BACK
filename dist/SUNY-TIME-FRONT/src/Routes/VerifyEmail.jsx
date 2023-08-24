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
const react_2 = require("@chakra-ui/react");
const registerState = {
    formSuccess: null,
    errorMessage: "",
};
function VerifyEmail() {
    var _a;
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [bgImage, setbgImage] = (0, react_1.useState)("");
    const [values, setValues] = (0, react_1.useState)(registerState);
    const setGlobalCurrentState = (0, recoil_1.useSetRecoilState)(atoms_1.globalCurrentState);
    const { authNum } = (0, recoil_1.useRecoilValue)(atoms_1.emailConfirmationState);
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, setError, reset, } = (0, react_hook_form_1.useForm)();
    let navigateBackOrNot = false;
    const onValid = (data) => __awaiter(this, void 0, void 0, function* () {
        // console.log("data here");
        // console.log(data);
        if (data.emailConfirmation === String(authNum)) {
            setError("emailConfirmation", { message: "Email Confirmation Failed" }, { shouldFocus: true });
        }
        //register user
        try {
            const { data } = yield axios_1.default.post("/api/v1/auth/register");
            const { user, token } = data;
            setGlobalCurrentState((currentState) => {
                return Object.assign(Object.assign({}, currentState), { token,
                    user });
            });
            //adding user to local storage
            (0, utils_1.addUserToLocalStorage)({ user, token });
            setValues(Object.assign(Object.assign({}, values), { formSuccess: true }));
            //navigate back to previous page
            navigateBackOrNot = true;
            if (navigateBackOrNot) {
                setTimeout(() => {
                    navigate("/course-review");
                }, 1500);
            }
        }
        catch (error) {
            // console.log(error.response);
            setValues(Object.assign(Object.assign({}, values), { formSuccess: false, errorMessage: error.response.data.msg }));
        }
    });
    (0, react_1.useEffect)(() => {
        setbgImage(assets_1.bgImages[Math.floor(Math.random() * assets_1.bgImages.length)]);
        if (isSubmitSuccessful) {
            reset({
                emailConfirmation: "",
            });
        }
    }, [bgImage, reset, isSubmitSuccessful]);
    return (<Register_1.Wrapper className="full-page" bgImage={bgImage}>
      <form className="form" onSubmit={handleSubmit(onValid)}>
        <Register_1.Logo src={navbar_logo_svg_1.default} alt="sunytime" className="logo"/>
        <h3>Register</h3>
        <react_2.Progress hasStripe value={33}/>
        {values.formSuccess === true && (<Components_1.Alert message="User created! Redirecting..." ifSuccess={true}/>)}

        {values.formSuccess === false && (<Components_1.Alert message={values.errorMessage}/>)}

        {/* email confirmation */}
        <div className="form-row">
          <label htmlFor="emailConfirmation" className="form-label">
            email confirmation
          </label>
          <h4>이메일로 발송된 6자리 숫자를 입력해주세요.</h4>
          <input type="text" className="form-input" {...register("emailConfirmation", { required: true })} placeholder="EMAIL CONFIRMATION"></input>
        </div>

        {((_a = errors === null || errors === void 0 ? void 0 : errors.emailConfirmation) === null || _a === void 0 ? void 0 : _a.message) && (<Components_1.Alert message={errors.emailConfirmation.message}/>)}

        <button type="submit" className="btn btn-block">
          submit
        </button>

        <button onClick={() => {
            navigate(-1);
        }} className="btn btn-block">
          Go back
        </button>
      </form>
    </Register_1.Wrapper>);
}
exports.default = VerifyEmail;

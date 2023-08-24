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
const react_hook_form_1 = require("react-hook-form");
const api_1 = require("../api");
const BulletinCommentPost_1 = require("../assets/wrappers/BulletinCommentPost");
const Alert_1 = __importDefault(require("./Alert"));
const BCPState = {
    formSuccess: null,
    errorMessage: "",
};
function BulletinCommentPost({ id }) {
    var _a;
    const [values, setValues] = (0, react_1.useState)(BCPState);
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset, } = (0, react_hook_form_1.useForm)({
        defaultValues: {
            text: "",
            anonymity: true,
        },
    });
    const onValid = (data) => __awaiter(this, void 0, void 0, function* () {
        const newComment = {
            text: data.text,
            anonymity: data.anonymity,
        };
        // console.log(newComment);
        try {
            const { data } = yield api_1.authFetch.post(`bulletin/${id}`, newComment);
            // console.log(data);
            setValues(Object.assign(Object.assign({}, values), { formSuccess: true }));
            setTimeout(() => {
                //clear alert
                setValues(Object.assign(Object.assign({}, values), { formSuccess: null, errorMessage: "" }));
            }, 3000);
            window.location.reload();
        }
        catch (error) {
            // console.log(error.response);
            if (error.response.status !== 401) {
                setValues(Object.assign(Object.assign({}, values), { formSuccess: false, errorMessage: error.response.data.msg }));
            }
            //clear alert
            setTimeout(() => {
                setValues(Object.assign(Object.assign({}, values), { formSuccess: null, errorMessage: "" }));
            }, 4000);
        }
    });
    (0, react_1.useEffect)(() => {
        if (isSubmitSuccessful) {
            reset({
                text: "",
                anonymity: true,
            });
        }
    }, [reset, isSubmitSuccessful]);
    return (<form onSubmit={handleSubmit(onValid)}>
      {values.formSuccess === true && (<Alert_1.default message="Comment Posted!" ifSuccess={true}/>)}

      {values.formSuccess === false && <Alert_1.default message={values.errorMessage}/>}

      <BulletinCommentPost_1.Row>
        <BulletinCommentPost_1.InputContainer>
          <input type="text" className="form-input" {...register("text", { required: true })} placeholder="COMMENT"></input>
        </BulletinCommentPost_1.InputContainer>
        {((_a = errors === null || errors === void 0 ? void 0 : errors.text) === null || _a === void 0 ? void 0 : _a.message) && <Alert_1.default message={errors.text.message}/>}

        <BulletinCommentPost_1.ButtonContainer>
          <input type="checkbox" {...register("anonymity")} id="anonymity" className="anonymity-checkbox"/>
          <label htmlFor="anonymity">Anonymity</label>
          <BulletinCommentPost_1.Button className="btn" type="submit">
            Save
          </BulletinCommentPost_1.Button>
        </BulletinCommentPost_1.ButtonContainer>
      </BulletinCommentPost_1.Row>
    </form>);
}
exports.default = BulletinCommentPost;

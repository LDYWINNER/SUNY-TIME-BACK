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
const react_2 = require("@chakra-ui/react");
const Components_1 = require("../Components");
const UpdateUserModal_1 = require("../assets/wrappers/UpdateUserModal");
const navbar_logo_svg_1 = __importDefault(require("../assets/images/navbar_logo.svg"));
const react_hook_form_1 = require("react-hook-form");
const recoil_1 = require("recoil");
const atoms_1 = require("../atoms");
const utils_1 = require("../utils");
const api_1 = require("../api");
const registerState = {
    formSuccess: null,
    errorMessage: "",
};
function UpdateUserModal({ isOpen, onClose }) {
    var _a;
    const [values, setValues] = (0, react_1.useState)(registerState);
    const setGlobalCurrentState = (0, recoil_1.useSetRecoilState)(atoms_1.globalCurrentState);
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset, watch, } = (0, react_hook_form_1.useForm)();
    const onValid = (data) => __awaiter(this, void 0, void 0, function* () {
        const newUser = {
            username: data.username,
            school: data.school,
            major: data.major,
        };
        // console.log(newUser);
        try {
            const { data } = yield api_1.authFetch.patch("/auth/updateUser", newUser);
            // console.log(data);
            const { user, token } = data;
            setGlobalCurrentState((currentState) => {
                return Object.assign(Object.assign({}, currentState), { token,
                    user });
            });
            //adding user to local storage
            (0, utils_1.addUserToLocalStorage)({ user, token });
            setValues(Object.assign(Object.assign({}, values), { formSuccess: true }));
            setTimeout(() => {
                //clear alert
                setValues(Object.assign(Object.assign({}, values), { formSuccess: null, errorMessage: "" }));
            }, 5000);
        }
        catch (error) {
            // console.log(error.response);
            if (error.response.status !== 401) {
                setValues(Object.assign(Object.assign({}, values), { formSuccess: false, errorMessage: error.response.data.msg }));
            }
            //clear alert
            setTimeout(() => {
                setValues(Object.assign(Object.assign({}, values), { formSuccess: null, errorMessage: "" }));
            }, 5000);
        }
    });
    (0, react_1.useEffect)(() => {
        if (isSubmitSuccessful) {
            reset({
                username: "",
                school: "-1",
                major: "-2",
            });
        }
    }, [reset, isSubmitSuccessful]);
    return (<>
      <react_2.Modal blockScrollOnMount={false} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
        <react_2.ModalOverlay />
        <react_2.ModalContent>
          <UpdateUserModal_1.Wrapper>
            <form onSubmit={handleSubmit(onValid)}>
              <react_2.ModalHeader>My Profile</react_2.ModalHeader>
              <react_2.ModalCloseButton />
              <react_2.ModalBody>
                <UpdateUserModal_1.Logo src={navbar_logo_svg_1.default} alt="sunytime" className="logo"/>

                {values.formSuccess === true && (<Components_1.Alert message="My Profile Updated!" ifSuccess={true}/>)}

                {values.formSuccess === false && (<Components_1.Alert message={values.errorMessage}/>)}

                <div className="form-row">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input type="text" className="form-input" {...register("username", { required: true })} placeholder="USERNAME"></input>
                </div>

                {((_a = errors === null || errors === void 0 ? void 0 : errors.username) === null || _a === void 0 ? void 0 : _a.message) && (<Components_1.Alert message={errors.username.message}/>)}

                <label htmlFor="school" className="form-label">
                  School & Major
                </label>

                <select {...register("school", { required: true })} defaultValue="-1">
                  <option value="-1" disabled>
                    SELECT SCHOOL
                  </option>
                  <option value="1">SBU</option>
                  <option value="2">FIT</option>
                </select>
                <select {...register("major", { required: true })} defaultValue="-2">
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
                </select>
              </react_2.ModalBody>

              <react_2.ModalFooter>
                <UpdateUserModal_1.Button type="submit">Save</UpdateUserModal_1.Button>
              </react_2.ModalFooter>
            </form>
          </UpdateUserModal_1.Wrapper>
        </react_2.ModalContent>
      </react_2.Modal>
    </>);
}
exports.default = UpdateUserModal;

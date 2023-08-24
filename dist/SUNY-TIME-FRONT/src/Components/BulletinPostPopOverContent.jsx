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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const react_2 = require("@chakra-ui/react");
const Components_1 = require("../Components");
const BulletinPostPopOverContent_1 = require("../assets/wrappers/BulletinPostPopOverContent");
const bs_1 = require("react-icons/bs");
const api_1 = require("../api");
const recoil_1 = require("recoil");
const atoms_1 = require("../atoms");
const BPPOCState = {
    formSuccess: null,
    errorMessage: "",
};
function BulletinPostPopOverContent() {
    var _a, _b;
    const [values, setValues] = (0, react_1.useState)(BPPOCState);
    const { register, handleSubmit, formState: { errors }, reset, } = (0, react_hook_form_1.useForm)({
        defaultValues: {
            title: "",
            content: "",
            anonymity: true,
            existingBoard: "-1",
            newBoard: "",
        },
    });
    const isDark = (0, recoil_1.useRecoilValue)(atoms_1.isDarkAtom);
    const onValid = (data) => __awaiter(this, void 0, void 0, function* () {
        const newPost = {
            title: data.title,
            content: data.content,
            board: data.existingBoard,
            anonymity: data.anonymity,
        };
        // console.log(newPost);
        try {
            const { data } = yield api_1.authFetch.post("/bulletin", newPost);
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
        if (values.formSuccess) {
            reset({
                title: "",
                content: "",
                existingBoard: "-1",
                newBoard: "",
                anonymity: false,
            });
        }
    }, [reset, values.formSuccess]);
    return (<>
      <react_2.PopoverContent width={450}>
        <BulletinPostPopOverContent_1.Wrapper>
          <form onSubmit={handleSubmit(onValid)}>
            <react_2.PopoverArrow />
            <react_2.PopoverCloseButton color={isDark ? "white" : "black"}/>
            <react_2.PopoverHeader>Bulletin Post</react_2.PopoverHeader>
            <react_2.PopoverBody>
              {values.formSuccess === true && (<Components_1.Alert message="Bulletin Posted!" ifSuccess={true}/>)}

              {values.formSuccess === false && (<Components_1.Alert message={values.errorMessage}/>)}

              <div className="form-row">
                <label htmlFor="title" className="form-label">
                  제목
                </label>
                <input type="text" className="form-input" {...register("title", { required: true })} placeholder="제목"></input>
              </div>
              {((_a = errors === null || errors === void 0 ? void 0 : errors.title) === null || _a === void 0 ? void 0 : _a.message) && (<Components_1.Alert message={errors.title.message}/>)}

              <div className="form-row">
                <BulletinPostPopOverContent_1.Row>
                  <label htmlFor="content" className="form-label">
                    내용
                  </label>
                  <react_2.Tooltip hasArrow label={<>
                        <p>
                          Below is an summary of key content for using the
                          bulletin board feature.
                        </p>
                        <br />
                        <p>
                          - In the case of posting illegaly filmed material, etc
                        </p>
                        <p>
                          - Acts that infringe on the rights of others or cause
                          discomfort
                        </p>
                        <p>
                          - Acts that violate law, such as criminal or illegal
                          acts
                        </p>
                        <p>
                          - Acts of writing posts including content related to
                          profanity, demeaning, discrimination, hatred, suicide,
                          and violence
                        </p>
                        <p>- Pornography, acts that cause sexual shame</p>
                      </>}>
                    <span className="tooltip-icon">
                      <bs_1.BsQuestionCircleFill />
                    </span>
                  </react_2.Tooltip>
                </BulletinPostPopOverContent_1.Row>
                <textarea cols={30} className="form-input" {...register("content", { required: true })} placeholder="SUNYTIME established rules to operate the community where anyone can use without any discomfort.&#13;&#10; Violations may result in postings being deleted and use of the service being permanently restricted."></textarea>
              </div>
              {((_b = errors === null || errors === void 0 ? void 0 : errors.content) === null || _b === void 0 ? void 0 : _b.message) && (<Components_1.Alert message={errors.content.message}/>)}

              <label htmlFor="existingBoard" className="form-label">
                게시판 선택
              </label>
              <BulletinPostPopOverContent_1.Row>
                <select {...register("existingBoard")} defaultValue="-1">
                  <option value="-1" disabled>
                    게시판 선택
                  </option>
                  <option value="Free">자유게시판</option>
                  <option value="courseRegister">수강신청게시판</option>
                  <option value="Secret">비밀게시판</option>
                  <option value="Freshmen">새내기게시판</option>
                  <option value="Promotion">홍보게시판</option>
                  <option value="Club">동아리게시판</option>
                  <option value="Sbu">본교게시판</option>
                </select>
              </BulletinPostPopOverContent_1.Row>
            </react_2.PopoverBody>
            <react_2.PopoverFooter>
              <div className="checkbox-div">
                <input type="checkbox" {...register("anonymity")} id="anonymity" className="anonymity-checkbox"/>
                <label htmlFor="anonymity">익명</label>
              </div>
              <BulletinPostPopOverContent_1.Button type="submit">저장</BulletinPostPopOverContent_1.Button>
            </react_2.PopoverFooter>
          </form>
        </BulletinPostPopOverContent_1.Wrapper>
      </react_2.PopoverContent>
    </>);
}
exports.default = BulletinPostPopOverContent;

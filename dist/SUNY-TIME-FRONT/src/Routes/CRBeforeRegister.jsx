"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const navbar_logo_svg_1 = __importDefault(require("../assets/images/navbar_logo.svg"));
const assets_1 = require("../assets/assets");
const Register_1 = require("../assets/wrappers/Register");
const react_router_dom_1 = require("react-router-dom");
const recoil_1 = require("recoil");
const atoms_1 = require("../atoms");
const react_2 = require("@chakra-ui/react");
function CRBeforeRegister() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [bgImage, setbgImage] = (0, react_1.useState)("");
    const globalState = (0, recoil_1.useRecoilValue)(atoms_1.globalCurrentState);
    const toast = (0, react_2.useToast)();
    (0, react_1.useEffect)(() => {
        var _a;
        setbgImage(assets_1.bgImages[Math.floor(Math.random() * assets_1.bgImages.length)]);
        if (((_a = globalState.user) === null || _a === void 0 ? void 0 : _a.courseReviewNum) < 3) {
            toast({
                title: "Authentication Warning!",
                description: "You should finish your course review first :)",
                status: "warning",
                duration: 9000,
                isClosable: true,
            });
        }
    }, []);
    return (<Register_1.Wrapper className="full-page" bgImage={bgImage}>
      <form className="form">
        <Register_1.Logo src={navbar_logo_svg_1.default} alt="sunytime" className="logo"/>
        <h3>Course Review ({globalState.user.courseReviewNum} / 3)</h3>
        <react_2.Progress hasStripe value={66}/>

        {/* Mandatory Course Review */}
        <h4 style={{ fontFamily: "Nanum Gothic, sans-serif" }}>
          회원가입을 완료하기 위해서 저번학기에 들었던 3개의 수업에 대한
          수강평을 작성해주세요.
        </h4>

        <button onClick={() => {
            navigate("/course-manager");
            localStorage.setItem("coursemanger-access", "true");
        }} className="btn btn-block">
          Go to Course Review
        </button>
      </form>
    </Register_1.Wrapper>);
}
exports.default = CRBeforeRegister;

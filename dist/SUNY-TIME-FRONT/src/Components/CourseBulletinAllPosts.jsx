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
const recoil_1 = require("recoil");
const atoms_1 = require("../atoms");
const utils_1 = require("../utils");
const api_1 = require("../api");
const Loading_1 = __importDefault(require("./Loading"));
const BulletinAllPosts_1 = require("../assets/wrappers/BulletinAllPosts");
const react_router_dom_1 = require("react-router-dom");
const moment_1 = __importDefault(require("moment"));
const ai_1 = require("react-icons/ai");
const CourseBulletinAllPosts = ({ id }) => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [globalState, setGlobalCurrentState] = (0, recoil_1.useRecoilState)(atoms_1.globalCurrentState);
    const logoutUser = (0, react_1.useCallback)(() => {
        setGlobalCurrentState((currentState) => {
            return Object.assign(Object.assign({}, currentState), { user: null, token: null });
        });
        (0, utils_1.removeUserFromLocalStorage)();
        localStorage.setItem("courseSubjSearchFilter", "AMS");
        localStorage.setItem("filterInstructor", "ALL");
        window.location.reload();
    }, [setGlobalCurrentState]);
    //getting the posts
    const getPost = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        let url = `bulletin?page=${globalState.bulletinPage}&board=${id}`;
        setIsLoading(true);
        try {
            const { data } = yield (0, api_1.authFetch)(url);
            const { bulletinAllPosts, bulletinTotalPosts, bulletinNumOfPages } = data;
            setGlobalCurrentState((currentState) => {
                return Object.assign(Object.assign({}, currentState), { bulletinAllPosts,
                    bulletinTotalPosts,
                    bulletinNumOfPages });
            });
            // console.log("answer here");
            // console.log(data);
            setIsLoading(false);
        }
        catch (error) {
            // console.log(error.response);
            // log user out
            logoutUser();
        }
    }), [globalState.bulletinPage, id, logoutUser, setGlobalCurrentState]);
    (0, react_1.useEffect)(() => {
        getPost();
    }, [getPost, globalState.bulletinPage]);
    if (isLoading) {
        return <Loading_1.default center/>;
    }
    if (globalState.bulletinAllPosts.length === 0) {
        return (<BulletinAllPosts_1.Wrapper>
        <h2>No posts to display... :(</h2>
      </BulletinAllPosts_1.Wrapper>);
    }
    return (<BulletinAllPosts_1.Wrapper>
      {globalState.bulletinAllPosts.map((post) => {
            return (<BulletinAllPosts_1.Post key={post._id}>
            <react_router_dom_1.Link to={`/bulletin/${post._id}`} state={{ id: post._id }}>
              <BulletinAllPosts_1.Container>
                <BulletinAllPosts_1.Row>
                  <h2>{post.title}</h2>
                  <BulletinAllPosts_1.User>
                    {post.anonymity ? "익명" : post.createdByUsername}
                  </BulletinAllPosts_1.User>
                </BulletinAllPosts_1.Row>
                <h4>{post.content}</h4>
              </BulletinAllPosts_1.Container>
              <BulletinAllPosts_1.Row>
                <h5>{(0, moment_1.default)(post.createdAt).format("MMMM Do, h:mm a")}</h5>
                <BulletinAllPosts_1.Icon>
                  <BulletinAllPosts_1.Row style={{ color: "blue" }}>
                    <ai_1.AiOutlineLike />
                    {post.likes.length}
                  </BulletinAllPosts_1.Row>
                </BulletinAllPosts_1.Icon>
              </BulletinAllPosts_1.Row>
            </react_router_dom_1.Link>
          </BulletinAllPosts_1.Post>);
        })}
    </BulletinAllPosts_1.Wrapper>);
};
exports.default = CourseBulletinAllPosts;

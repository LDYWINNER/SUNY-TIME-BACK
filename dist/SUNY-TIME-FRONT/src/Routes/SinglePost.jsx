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
const moment_1 = __importDefault(require("moment"));
const react_router_dom_1 = require("react-router-dom");
const recoil_1 = require("recoil");
const api_1 = require("../api");
const SinglePost_1 = require("../assets/wrappers/SinglePost");
const assets_1 = require("../assets/assets");
const react_1 = require("@chakra-ui/react");
const atoms_1 = require("../atoms");
const utils_1 = require("../utils");
const react_router_dom_2 = require("react-router-dom");
const react_2 = require("react");
const bi_1 = require("react-icons/bi");
const ai_1 = require("react-icons/ai");
const Loading_1 = __importDefault(require("../Components/Loading"));
const Components_1 = require("../Components");
function SinglePost() {
    const navigate = (0, react_router_dom_2.useNavigate)();
    const [isLoading, setIsLoading] = (0, react_2.useState)(false);
    const [bgImage, setBgImage] = (0, recoil_1.useRecoilState)(atoms_1.singlePageBgImageState);
    const location = (0, react_router_dom_1.useLocation)();
    const { id } = location.state;
    const [globalState, setGlobalCurrentState] = (0, recoil_1.useRecoilState)(atoms_1.globalCurrentState);
    const { isOpen, onOpen, onClose } = (0, react_1.useDisclosure)();
    const cancelRef = (0, react_2.useRef)(null);
    const [like, setLike] = (0, react_2.useState)(true);
    const [post, setPost] = (0, react_2.useState)();
    const [boardName, setBoardName] = (0, react_2.useState)("");
    const isDark = (0, recoil_1.useRecoilValue)(atoms_1.isDarkAtom);
    const logoutUser = (0, react_2.useCallback)(() => {
        setGlobalCurrentState((currentState) => {
            return Object.assign(Object.assign({}, currentState), { user: null, token: null });
        });
        (0, utils_1.removeUserFromLocalStorage)();
        localStorage.setItem("courseSubjSearchFilter", "AMS");
        localStorage.setItem("filterInstructor", "ALL");
        window.location.reload();
    }, [setGlobalCurrentState]);
    //getting the posts
    const getSinglePost = (0, react_2.useCallback)(() => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        try {
            const { data } = yield (0, api_1.authFetch)(`bulletin/${id}`);
            const { post: { comments, anonymity, board, content, createdAt, createdByUsername, likes, title, }, } = data;
            setPost({
                comments,
                anonymity,
                board,
                content,
                createdAt,
                createdByUsername,
                likes,
                title,
            });
            // console.log(data);
            if (board === "Free") {
                setBoardName("자유게시판");
            }
            else if (board === "Secret") {
                setBoardName("비밀게시판");
            }
            else if (board === "Freshmen") {
                setBoardName("새내기게시판");
            }
            else if (board === "Info") {
                setBoardName("정보게시판");
            }
            else if (board === "Promotion") {
                setBoardName("홍보게시판");
            }
            else if (board === "Club") {
                setBoardName("동아리게시판");
            }
            setIsLoading(false);
        }
        catch (error) {
            // console.log(error.response);
            // log user out
            logoutUser();
        }
    }), [id, logoutUser]);
    const deletePost = (id) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield api_1.authFetch.delete(`/bulletin/${id}`);
            navigate("/bulletin");
        }
        catch (error) {
            // console.log(error);
            // log user out
            logoutUser();
        }
    });
    const handleLike = (id) => __awaiter(this, void 0, void 0, function* () {
        try {
            setLike((prev) => !prev);
            // console.log(like);
            yield api_1.authFetch.patch(`/bulletin?id=${id}&like=${like}`);
            window.location.reload();
        }
        catch (error) {
            // console.log(error);
        }
    });
    (0, react_2.useEffect)(() => {
        setBgImage(assets_1.bgImages[Math.floor(Math.random() * assets_1.bgImages.length)]);
        getSinglePost();
    }, []);
    if (isLoading) {
        return (<SinglePost_1.LoadingWrapper>
        <Loading_1.default center/>
      </SinglePost_1.LoadingWrapper>);
    }
    return (<SinglePost_1.Wrapper bgImage={bgImage}>
      <SinglePost_1.Container>
        <react_1.IconButton colorScheme={isDark ? "blackAlpha" : "gray"} onClick={() => {
            navigate(-1);
        }} aria-label="Go back" icon={<bi_1.BiArrowBack />}/>
        <SinglePost_1.Main>
          <SinglePost_1.TitleRow>
            <SinglePost_1.Title>{boardName}</SinglePost_1.Title>
            <button type="button" className="btn" onClick={onOpen}>
              DELETE
            </button>
            <react_1.AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
              <react_1.AlertDialogOverlay>
                <react_1.AlertDialogContent>
                  <react_1.AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Post
                  </react_1.AlertDialogHeader>

                  <react_1.AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </react_1.AlertDialogBody>

                  <react_1.AlertDialogFooter>
                    <react_1.Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </react_1.Button>
                    <react_1.Button colorScheme="red" onClick={() => deletePost(id)} ml={3}>
                      Delete
                    </react_1.Button>
                  </react_1.AlertDialogFooter>
                </react_1.AlertDialogContent>
              </react_1.AlertDialogOverlay>
            </react_1.AlertDialog>
          </SinglePost_1.TitleRow>
          <SinglePost_1.Row>
            <h1>{post === null || post === void 0 ? void 0 : post.title}</h1>
            <SinglePost_1.Col>
              <h4>{(post === null || post === void 0 ? void 0 : post.anonymity) ? "익명" : post === null || post === void 0 ? void 0 : post.createdByUsername}</h4>
              <h4 className="time">
                {(0, moment_1.default)(post === null || post === void 0 ? void 0 : post.createdAt).format("MMMM Do, h:mm a")}
              </h4>
            </SinglePost_1.Col>
          </SinglePost_1.Row>

          <SinglePost_1.PostContent>{post === null || post === void 0 ? void 0 : post.content}</SinglePost_1.PostContent>

          <SinglePost_1.IconRow>
            <react_1.IconButton disabled={globalState.user ? false : true} colorScheme={isDark ? "blackAlpha" : "gray"} aria-label="Like this post?" icon={(post === null || post === void 0 ? void 0 : post.likes.includes(globalState.user._id)) ? (<ai_1.AiFillLike />) : (<ai_1.AiOutlineLike />)} onClick={() => handleLike(id)}/>
            <h4>{post === null || post === void 0 ? void 0 : post.likes.length} likes</h4>
          </SinglePost_1.IconRow>
          <SinglePost_1.Comments>
            <Components_1.BulletinCommentPost id={id}/>
            <Components_1.BulletinAllComments comments={post === null || post === void 0 ? void 0 : post.comments}/>
          </SinglePost_1.Comments>
        </SinglePost_1.Main>
      </SinglePost_1.Container>
    </SinglePost_1.Wrapper>);
}
exports.default = SinglePost;

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
const api_1 = require("../api");
const BulletinAllComments_1 = require("../assets/wrappers/BulletinAllComments");
const atoms_1 = require("../atoms");
const utils_1 = require("../utils");
const react_2 = require("@chakra-ui/react");
const ai_1 = require("react-icons/ai");
const moment_1 = __importDefault(require("moment"));
function BulletinAllComments({ comments }) {
    const [globalState, setGlobalCurrentState] = (0, recoil_1.useRecoilState)(atoms_1.globalCurrentState);
    const [like, setLike] = (0, react_1.useState)(true);
    const { isOpen, onOpen, onClose } = (0, react_2.useDisclosure)();
    const cancelRef = (0, react_1.useRef)(null);
    const isDark = (0, recoil_1.useRecoilValue)(atoms_1.isDarkAtom);
    const logoutUser = (0, react_1.useCallback)(() => {
        setGlobalCurrentState((currentState) => {
            return Object.assign(Object.assign({}, currentState), { user: null, token: null });
        });
        (0, utils_1.removeUserFromLocalStorage)();
        localStorage.setItem("courseSubjSearchFilter", "AMS");
        localStorage.setItem("filterInstructor", "ALL");
        window.location.reload();
    }, [setGlobalCurrentState]);
    const deleteComment = (id) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield api_1.authFetch.delete(`/bulletin/comment/${id}`);
            window.location.reload();
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
            yield api_1.authFetch.patch(`/bulletin/comment/${id}`);
            window.location.reload();
        }
        catch (error) {
            // console.log(error);
        }
    });
    if (comments === undefined) {
        return <h1>Something wrong...</h1>;
    }
    return (<BulletinAllComments_1.Wrapper>
      {comments.map((comment) => {
            return (<BulletinAllComments_1.Comment key={comment._id}>
            <BulletinAllComments_1.Row>
              <BulletinAllComments_1.Name>
                {comment.anonymity ? "익명" : comment.createdByUsername}
              </BulletinAllComments_1.Name>
              <h4 className="time">
                {(0, moment_1.default)(comment === null || comment === void 0 ? void 0 : comment.createdAt).format("MMMM Do, h:mm a")}
              </h4>
            </BulletinAllComments_1.Row>

            <BulletinAllComments_1.SecondRow>
              <BulletinAllComments_1.Text>{comment.text}</BulletinAllComments_1.Text>
              <BulletinAllComments_1.Buttons>
                <react_2.IconButton disabled={globalState.user ? false : true} colorScheme={isDark ? "blackAlpha" : "gray"} aria-label="Like this comment?" icon={(comment === null || comment === void 0 ? void 0 : comment.likes.includes(globalState.user._id)) ? (<ai_1.AiFillLike />) : (<ai_1.AiOutlineLike />)} onClick={() => handleLike(comment._id)}/>
                <h4>{comment === null || comment === void 0 ? void 0 : comment.likes.length} likes</h4>
                <react_2.IconButton disabled={globalState.user ? false : true} colorScheme={isDark ? "blackAlpha" : "gray"} aria-label="Delete this comment?" icon={<ai_1.AiTwotoneDelete />} onClick={onOpen}/>
              </BulletinAllComments_1.Buttons>
            </BulletinAllComments_1.SecondRow>
            <react_2.AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
              <react_2.AlertDialogOverlay>
                <react_2.AlertDialogContent>
                  <react_2.AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Comment
                  </react_2.AlertDialogHeader>

                  <react_2.AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </react_2.AlertDialogBody>

                  <react_2.AlertDialogFooter>
                    <react_2.Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </react_2.Button>
                    <react_2.Button colorScheme="red" onClick={() => deleteComment(comment._id)} ml={3}>
                      Delete
                    </react_2.Button>
                  </react_2.AlertDialogFooter>
                </react_2.AlertDialogContent>
              </react_2.AlertDialogOverlay>
            </react_2.AlertDialog>
          </BulletinAllComments_1.Comment>);
        })}
    </BulletinAllComments_1.Wrapper>);
}
exports.default = BulletinAllComments;

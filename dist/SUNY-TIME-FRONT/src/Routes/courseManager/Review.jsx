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
const api_1 = require("../../api");
const atoms_1 = require("../../atoms");
const index_1 = require("../../Components/index");
const react_2 = require("@chakra-ui/react");
const Review_1 = require("../../assets/wrappers/Review");
const bs_1 = require("react-icons/bs");
const ai_1 = require("react-icons/ai");
const moment_1 = __importDefault(require("moment"));
const no_data_svg_1 = __importDefault(require("../../assets/images/no-data.svg"));
const Review = ({ id, reviews, reviewsExisting }) => {
    var _a;
    //course review modal
    const { isOpen, onOpen, onClose } = (0, react_2.useDisclosure)();
    //course reviews
    const globalState = (0, recoil_1.useRecoilValue)(atoms_1.globalCurrentState);
    const [like, setLike] = (0, react_1.useState)(true);
    const isDark = (0, recoil_1.useRecoilValue)(atoms_1.isDarkAtom);
    const handleLike = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            setLike((prev) => !prev);
            // console.log(like);
            yield api_1.authFetch.patch(`/course/review/${id}`);
            window.location.reload();
        }
        catch (error) {
            // console.log(error);
        }
    });
    if (reviews === undefined) {
        return <h1>Something wrong...</h1>;
    }
    return (<Review_1.Wrapper>
      <Review_1.ButtonContainer>
        <Review_1.CourseReviewBtn type="button" className="btn" onClick={onOpen}>
          <bs_1.BsPencilSquare />
          <h4>Review Course</h4>
        </Review_1.CourseReviewBtn>
        <index_1.CourseReviewModal id={id} isOpen={isOpen} onClose={onClose}/>
      </Review_1.ButtonContainer>
      <Review_1.Reviews>
        {((_a = globalState.user) === null || _a === void 0 ? void 0 : _a.courseReviewNum) < 3 ? (<div style={{ display: "flex" }}>
            <img src={no_data_svg_1.default} alt="not data"/>
            <div>
              <Review_1.Span>
                Data is available after you finish your registration process :)
              </Review_1.Span>
              <br />
              <Review_1.Span>(3 course reviews)</Review_1.Span>
            </div>
          </div>) : reviewsExisting ? (<Review_1.NoReviewSpan>
            No detailed evaluation yet for this course... :(
          </Review_1.NoReviewSpan>) : (<></>)}
        {reviews.map((review) => {
            if (review.overallEvaluation !== "") {
                return (<Review_1.SingleReview key={review._id}>
                <Review_1.Container>
                  <Review_1.Name>
                    <h4>
                      {review.anonymity ? "익명" : review.createdByUsername}
                    </h4>
                    {(review === null || review === void 0 ? void 0 : review.myLetterGrade) !== "-1" ? (<Review_1.Grade>{review === null || review === void 0 ? void 0 : review.myLetterGrade}</Review_1.Grade>) : (<></>)}
                    <Review_1.Semester>{review.semester}</Review_1.Semester>
                    <Review_1.Instructor>{review.instructor}</Review_1.Instructor>
                  </Review_1.Name>
                  <h4>
                    {review.overallGrade === 1 ? (<Review_1.Row>
                        <ai_1.AiFillStar color={isDark ? "yellow" : "red"}/>
                        <ai_1.AiFillStar />
                        <ai_1.AiFillStar />
                        <ai_1.AiFillStar />
                        <ai_1.AiFillStar />
                      </Review_1.Row>) : review.overallGrade === 2 ? (<Review_1.Row>
                        <ai_1.AiFillStar color={isDark ? "yellow" : "red"}/>
                        <ai_1.AiFillStar color={isDark ? "yellow" : "red"}/>
                        <ai_1.AiFillStar />
                        <ai_1.AiFillStar />
                        <ai_1.AiFillStar />
                      </Review_1.Row>) : review.overallGrade === 3 ? (<Review_1.Row>
                        <ai_1.AiFillStar color={isDark ? "yellow" : "red"}/>
                        <ai_1.AiFillStar color={isDark ? "yellow" : "red"}/>
                        <ai_1.AiFillStar color={isDark ? "yellow" : "red"}/>
                        <ai_1.AiFillStar />
                        <ai_1.AiFillStar />
                      </Review_1.Row>) : review.overallGrade === 4 ? (<Review_1.Row>
                        <ai_1.AiFillStar color={isDark ? "yellow" : "red"}/>
                        <ai_1.AiFillStar color={isDark ? "yellow" : "red"}/>
                        <ai_1.AiFillStar color={isDark ? "yellow" : "red"}/>
                        <ai_1.AiFillStar color={isDark ? "yellow" : "red"}/>
                        <ai_1.AiFillStar />
                      </Review_1.Row>) : (<Review_1.Row>
                        <ai_1.AiFillStar color={isDark ? "yellow" : "red"}/>
                        <ai_1.AiFillStar color={isDark ? "yellow" : "red"}/>
                        <ai_1.AiFillStar color={isDark ? "yellow" : "red"}/>
                        <ai_1.AiFillStar color={isDark ? "yellow" : "red"}/>
                        <ai_1.AiFillStar color={isDark ? "yellow" : "red"}/>
                      </Review_1.Row>)}
                  </h4>
                  <h4>{review.overallEvaluation}</h4>
                </Review_1.Container>
                <Review_1.Container>
                  <h4>{(0, moment_1.default)(review.createdAt).format("MMMM Do, h:mm a")}</h4>
                  <Review_1.Likes>
                    <react_2.IconButton disabled={globalState.user ? false : true} colorScheme={isDark ? "blackAlpha" : "gray"} aria-label="Like this comment?" icon={(review === null || review === void 0 ? void 0 : review.likes.includes(globalState.user._id)) ? (<ai_1.AiFillLike />) : (<ai_1.AiOutlineLike />)} onClick={() => handleLike(review._id)}/>
                    <h4>{review === null || review === void 0 ? void 0 : review.likes.length} likes</h4>
                  </Review_1.Likes>
                </Review_1.Container>
              </Review_1.SingleReview>);
            }
            return <></>;
        })}
      </Review_1.Reviews>
    </Review_1.Wrapper>);
};
exports.default = Review;

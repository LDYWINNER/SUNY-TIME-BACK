"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Bulletin_1 = require("../assets/wrappers/Bulletin");
const assets_1 = require("../assets/assets");
const bs_1 = require("react-icons/bs");
const Components_1 = require("../Components");
const react_2 = require("@chakra-ui/react");
const recoil_1 = require("recoil");
const atoms_1 = require("../atoms");
const Bulletin = () => {
    const [bgImage, setBgImage] = (0, recoil_1.useRecoilState)(atoms_1.singlePageBgImageState);
    const { bulletinNumOfPages } = (0, recoil_1.useRecoilValue)(atoms_1.globalCurrentState);
    const { boardFilter } = (0, recoil_1.useRecoilValue)(atoms_1.bulletinSearchState);
    let whichBoard = "";
    if (boardFilter === "Free") {
        whichBoard = "자유게시판";
    }
    else if (boardFilter === "Secret") {
        whichBoard = "비밀게시판";
    }
    else if (boardFilter === "Freshmen") {
        whichBoard = "새내기게시판";
    }
    else if (boardFilter === "courseRegister") {
        whichBoard = "수강신청게시판";
    }
    else if (boardFilter === "Promotion") {
        whichBoard = "홍보게시판";
    }
    else if (boardFilter === "Club") {
        whichBoard = "동아리게시판";
    }
    else if (boardFilter === "Sbu") {
        whichBoard = "본교게시판";
    }
    (0, react_1.useEffect)(() => {
        setBgImage(assets_1.bgImages[Math.floor(Math.random() * assets_1.bgImages.length)]);
    }, [bgImage, setBgImage]);
    return (<Bulletin_1.Wrapper bgImage={bgImage}>
      <Bulletin_1.Main>
        <Bulletin_1.MainContent>
          <Bulletin_1.FilterRow>
            <Components_1.BulletinSearch />
          </Bulletin_1.FilterRow>
          <Bulletin_1.TitleRow>
            <Bulletin_1.Title>{whichBoard}</Bulletin_1.Title>
            <react_2.Popover closeOnBlur={false} closeOnEsc={false}>
              <react_2.PopoverTrigger>
                <Bulletin_1.BulletinPostBtn type="button" className="btn">
                  <bs_1.BsPencilSquare />
                </Bulletin_1.BulletinPostBtn>
              </react_2.PopoverTrigger>
              <Components_1.BulletinPostPopOverContent />
            </react_2.Popover>
          </Bulletin_1.TitleRow>
          <Components_1.BulletinAllPosts />
          {bulletinNumOfPages > 1 && <Components_1.BulletinPagination />}
        </Bulletin_1.MainContent>
        <Bulletin_1.SubContent>
          <Components_1.Announcement />
        </Bulletin_1.SubContent>
      </Bulletin_1.Main>
    </Bulletin_1.Wrapper>);
};
exports.default = Bulletin;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const recoil_1 = require("recoil");
const atoms_1 = require("../../atoms");
const bs_1 = require("react-icons/bs");
const Components_1 = require("../../Components");
const CourseBulletin_1 = require("../../assets/wrappers/CourseBulletin");
const CourseBulletin = ({ id }) => {
    const { bulletinNumOfPages } = (0, recoil_1.useRecoilValue)(atoms_1.globalCurrentState);
    return (<CourseBulletin_1.Wrapper>
      <CourseBulletin_1.PostButton>
        <react_1.Popover closeOnBlur={false} closeOnEsc={false}>
          <react_1.PopoverTrigger>
            <CourseBulletin_1.BulletinPostBtn type="button" className="btn">
              <bs_1.BsPencilSquare />
            </CourseBulletin_1.BulletinPostBtn>
          </react_1.PopoverTrigger>
          <Components_1.CourseBulletinPopOver id={id}/>
        </react_1.Popover>
      </CourseBulletin_1.PostButton>
      <Components_1.CourseBulletinAllPosts id={id}/>
      {bulletinNumOfPages > 1 && <Components_1.CourseBulletinPagination />}
    </CourseBulletin_1.Wrapper>);
};
exports.default = CourseBulletin;

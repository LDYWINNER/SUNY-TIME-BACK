"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Components_1 = require("../../Components");
const assets_1 = require("../../assets/assets");
const fa_1 = require("react-icons/fa");
const cmLinks_1 = __importDefault(require("../../utils/cmLinks"));
const CMSharedLayout_1 = require("../../assets/wrappers/CMSharedLayout");
const CMSharedLayout = () => {
    const [bgImage, setbgImage] = (0, react_1.useState)("");
    const [showSidebar, setShowSidebar] = (0, react_1.useState)(true);
    const toggleSidebar = () => {
        setShowSidebar((prev) => !prev);
    };
    (0, react_1.useEffect)(() => {
        setbgImage(assets_1.bgImages[Math.floor(Math.random() * assets_1.bgImages.length)]);
    }, [bgImage]);
    return (<CMSharedLayout_1.Wrapper bgImage={bgImage}>
      <main className="bulletin-main">
        <div className="big-sidebar">
          <Components_1.BigSidebar links={cmLinks_1.default} showSidebar={showSidebar}/>
          <button type="button" className={showSidebar ? "toggle-btn toggle-btn-hide" : "toggle-btn "} onClick={toggleSidebar}>
            <fa_1.FaAlignLeft />
          </button>
        </div>
        <div className="bulletin">
          <CMSharedLayout_1.Main>
            <react_router_dom_1.Outlet />
          </CMSharedLayout_1.Main>
        </div>
      </main>
    </CMSharedLayout_1.Wrapper>);
};
exports.default = CMSharedLayout;

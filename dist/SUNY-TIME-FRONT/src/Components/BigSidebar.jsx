"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BigSidebar_1 = __importDefault(require("../assets/wrappers/BigSidebar"));
const NavLinks_1 = __importDefault(require("./NavLinks"));
const BigSidebar = ({ links, showSidebar }) => {
    return (<BigSidebar_1.default>
      <div className={showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"}>
        <div className="content">
          <NavLinks_1.default links={links}/>
        </div>
      </div>
    </BigSidebar_1.default>);
};
exports.default = BigSidebar;

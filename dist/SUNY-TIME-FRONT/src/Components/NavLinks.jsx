"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const NavLinks_1 = require("../assets/wrappers/NavLinks");
const io_1 = require("react-icons/io");
const NavLinks = ({ links, onClick }) => {
    return (<div className="nav-links">
      {links.map((link) => {
            const { text, path, id } = link;
            return (<react_router_dom_1.NavLink to={path} key={id} onClick={onClick} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} end>
            <NavLinks_1.Content>
              <h4>{text}</h4>
              <io_1.IoIosArrowForward />
            </NavLinks_1.Content>
          </react_router_dom_1.NavLink>);
        })}
    </div>);
};
exports.default = NavLinks;

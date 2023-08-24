"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const not_found_svg_1 = __importDefault(require("../assets/images/not-found.svg"));
const Error_1 = __importDefault(require("../assets/wrappers/Error"));
const Error = () => {
    return (<Error_1.default className="full-page">
      <div>
        <not_found_svg_1.default src={not_found_svg_1.default} alt="not found"/>
        <h3>Ohh! page not found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <react_router_dom_1.Link to="/">back home</react_router_dom_1.Link>
      </div>
    </Error_1.default>);
};
exports.default = Error;

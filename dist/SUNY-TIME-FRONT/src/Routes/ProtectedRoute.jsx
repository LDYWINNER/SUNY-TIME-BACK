"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const recoil_1 = require("recoil");
const atoms_1 = require("../atoms");
const ProtectedRoute = ({ children }) => {
    var _a;
    const user = localStorage.getItem("user");
    const courseManagerAccess = JSON.parse(localStorage.getItem("coursemanger-access"));
    const globalState = (0, recoil_1.useRecoilValue)(atoms_1.globalCurrentState);
    if (((_a = globalState.user) === null || _a === void 0 ? void 0 : _a.courseReviewNum) < 3 && !courseManagerAccess) {
        return <react_router_dom_1.Navigate to="/course-review"/>;
    }
    if (!user) {
        return <react_router_dom_1.Navigate to="/register"/>;
    }
    return children;
};
exports.default = ProtectedRoute;

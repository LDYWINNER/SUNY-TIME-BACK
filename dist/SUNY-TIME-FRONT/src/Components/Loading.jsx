"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Loading = ({ center }) => {
    return <div className={center ? "loading loading-center" : "loading"}></div>;
};
exports.default = Loading;

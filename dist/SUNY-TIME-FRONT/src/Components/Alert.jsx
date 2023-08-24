"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Alert = ({ message, ifSuccess }) => {
    return (<div className={ifSuccess
            ? "course-review-alert alert-success"
            : "course-review-alert alert-danger"}>
      {message}
    </div>);
};
exports.default = Alert;

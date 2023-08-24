"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FormRow = ({ type, name, labelText, validation, placeholder, register, }) => {
    return (<div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input type={type} className="form-input" {...register(name, Object.assign({ required: true }, validation))} placeholder={placeholder}></input>
    </div>);
};
exports.default = FormRow;

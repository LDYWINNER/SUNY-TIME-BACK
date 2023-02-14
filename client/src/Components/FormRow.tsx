import { UseFormRegister } from "react-hook-form";

interface IForm {
  username: string;
  email: string;
  passwordLogin: string;
  passwordRegister: string;
  passwordConfirmation: string;
  school: string;
  major: string;
}

type FormType =
  | "email"
  | "username"
  | "passwordLogin"
  | "passwordRegister"
  | "passwordConfirmation";

interface IFormRowProps {
  type: string;
  name: FormType;
  labelText?: string;
  placeholder: string;
  validation?: {
    [key: string]:
      | { [key: string]: string | number | RegExp }
      | RegExp
      | string
      | number;
  };
  register: UseFormRegister<IForm>;
}

const FormRow = ({
  type,
  name,
  labelText,
  validation,
  placeholder,
  register,
}: IFormRowProps) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        className="form-input"
        {...register(name, { required: true, ...validation })}
        placeholder={placeholder}
      ></input>
    </div>
  );
};

export default FormRow;

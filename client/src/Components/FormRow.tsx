interface IFormRowProps {
  type: string;
  name: string;
  value: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  labelText?: string;
}

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
}: IFormRowProps) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        required
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-input"
      ></input>
    </div>
  );
};

export default FormRow;

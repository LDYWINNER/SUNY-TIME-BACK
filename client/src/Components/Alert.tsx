interface IAlertProps {
  message: string;
}

const Alert = ({ message }: IAlertProps) => {
  console.log(message);
  return <div className="alert alert-danger">{message}</div>;
};

export default Alert;

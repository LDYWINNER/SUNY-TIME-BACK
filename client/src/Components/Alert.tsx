interface IAlertProps {
  message: string;
  ifSuccess?: boolean;
}

const Alert = ({ message, ifSuccess }: IAlertProps) => {
  console.log(message);
  return (
    <div className={ifSuccess ? "alert alert-success" : "alert alert-danger"}>
      {message}
    </div>
  );
};

export default Alert;

interface IAlertProps {
  message: string;
  ifSuccess?: boolean;
}

const Alert = ({ message, ifSuccess }: IAlertProps) => {
  console.log(message);
  return (
    <div
      className={
        ifSuccess
          ? "course-review-alert alert-success"
          : "course-review-alert alert-danger"
      }
    >
      {message}
    </div>
  );
};

export default Alert;

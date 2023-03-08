interface ILoading {
  center?: Boolean;
}

const Loading = ({ center }: ILoading) => {
  return <div className={center ? "loading loading-center" : "loading"}></div>;
};

export default Loading;

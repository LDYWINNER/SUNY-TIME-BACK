import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { globalCurrentState } from "../atoms";

const ProtectedRoute = ({ children }: any) => {
  const user = localStorage.getItem("user");
  const courseManagerAccess = JSON.parse(
    localStorage.getItem("coursemanger-access") as string
  );
  const globalState = useRecoilValue(globalCurrentState);

  if (globalState.user?.courseReviewNum < 3 && !courseManagerAccess) {
    return <Navigate to="/course-review" />;
  }
  if (!user) {
    return <Navigate to="/register" />;
  }
  return children;
};

export default ProtectedRoute;

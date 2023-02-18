import { useRecoilValue } from "recoil";
import { globalCurrentState } from "../atoms";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const { user } = useRecoilValue(globalCurrentState);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/register" />;
  }
  return children;
};

export default ProtectedRoute;

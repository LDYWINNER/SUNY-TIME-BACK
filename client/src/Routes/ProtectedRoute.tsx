import { Navigate, useMatch } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const user = localStorage.getItem("user");
  const courseReviewMatch = useMatch("/course-review");

  if (!user) {
    return <Navigate to="/register" />;
  }
  if (courseReviewMatch) {
    return <Navigate to="/register" />;
  }
  return children;
};

export default ProtectedRoute;

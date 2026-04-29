import { Navigate, useLocation } from "react-router-dom";
import Spinner from "./Spinner";

function CheckEmailRoute({ children }) {
  const location = useLocation();

  if (!location.state?.fromSignup) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default CheckEmailRoute;

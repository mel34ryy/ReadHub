import { useUser } from "../features/authentication/useUser";
import { Navigate } from "react-router-dom";
import Spinner from "./Spinner";

function PublicRoute({ children }) {
  const { isPending, isAuthenticated } = useUser();

  if (isPending)
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (isAuthenticated) return <Navigate to="/" replace />;

  return children;
}

export default PublicRoute;

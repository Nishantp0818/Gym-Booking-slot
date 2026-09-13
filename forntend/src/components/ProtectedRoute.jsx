import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  isLoggedIn,
  isAuthChecking,
  userRole,
  allowedRole,
}) => {

  // Authentication check complete hone ka wait
  if (isAuthChecking) {
    return <p>Checking authentication...</p>;
  }

  // User logged in nahi hai
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Agar page ke liye specific role required hai
  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  // User authenticated + correct role
  return children;
};

export default ProtectedRoute;
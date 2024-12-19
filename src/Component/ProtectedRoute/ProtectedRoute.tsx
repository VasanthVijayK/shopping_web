import * as React from "react"
import { Navigate } from "react-router-dom";
type Protected = {

  children:React.ReactNode
}
const ProtectedRoute = ({ children }:Protected) => {
  if (!JSON.parse(localStorage.getItem("isLoggedIn") || "false") as boolean) {
    return <Navigate to="/SignIn" replace />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { ReactElement } from "react";
import { useAuthContext } from "../hooks";

interface IProtectedRoute {
  children: ReactElement;
}

export function RequireAuth({ children }: IProtectedRoute): ReactElement {
  const { isLoggedIn } = useAuthContext();

  if (isLoggedIn === false) {
    return <Navigate to="/login" />;
  }

  return children;
}

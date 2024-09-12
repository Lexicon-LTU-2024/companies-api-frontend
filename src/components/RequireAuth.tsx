import { ReactElement } from "react";
import { useAuthContext } from "../hooks";
import { Navigate } from "react-router-dom";

interface IRequireAuthProps {
  children: ReactElement;
}

export function RequireAuth({ children }: IRequireAuthProps): ReactElement {
  const { isLoggedIn } = useAuthContext();

  if (isLoggedIn === false) {
    console.log("Is not logged in, redirected to login");
    return <Navigate to="/login" />;
  }

  return children;
}

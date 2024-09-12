import { ReactElement } from "react";
import { useAuthContext } from "../hooks";
import { Navigate } from "react-router-dom";

interface IRequireAuthProps {
  children: ReactElement;
}

export function RequireAuth({ children }: IRequireAuthProps): ReactElement {
  const { isLoggedIn } = useAuthContext();

  if (isLoggedIn === false) {
    return <Navigate to="/login" />;
  }

  return children;
}

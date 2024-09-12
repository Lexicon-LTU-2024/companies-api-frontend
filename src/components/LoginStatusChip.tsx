import { ReactElement } from "react";
import { useAuthContext } from "../hooks";

export function LoginStatusChip(): ReactElement {
  const { isLoggedIn, logout } = useAuthContext();

  return (
    <div id="login-status-chip">
      <p>Logged in: {isLoggedIn.toString()}</p>
      <button disabled={!isLoggedIn} onClick={logout}>
        Log out
      </button>
    </div>
  );
}

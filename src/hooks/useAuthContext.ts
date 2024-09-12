import { useContext } from "react";
import { AuthContext } from "../context/authProvider";

export function useAuthContext() {
  return useContext(AuthContext);
}

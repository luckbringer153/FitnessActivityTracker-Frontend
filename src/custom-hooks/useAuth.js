import { useContext } from "react";
import { AuthContext } from "../context";

export function useAuth() {
  const { token, isLoggedIn, updateAuthStatus, logout } =
    useContext(AuthContext);

  return { token, isLoggedIn, updateAuthStatus, logout };
}

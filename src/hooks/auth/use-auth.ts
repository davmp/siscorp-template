import { AuthProvider, AuthContext } from "@/providers/auth/auth-provider";
import { useContext } from "react";

export function useAuth() {
  return useContext<AuthProvider>(AuthContext);
}

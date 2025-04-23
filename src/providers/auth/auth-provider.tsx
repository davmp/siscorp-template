import { createContext, useState } from "react";
import { useUserResource } from "@/hooks/auth/use-user-resource";
import type { User } from "@/lib/auth-type";

export interface AuthProvider {
  user: User | null;
  isAuthenticated: boolean;

  login: (user: User, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthProvider>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useUserResource.read();
  const [currentUser, setCurrentUser] = useState<User | null>(user);
  const isAuthenticated = !!currentUser;

  function login(user: User) {
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  function logout() {
    setCurrentUser(null);
    localStorage.clear();
  }

  const value = {
    user: currentUser,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

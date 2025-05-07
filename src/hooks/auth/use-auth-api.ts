import { useAuth } from "./use-auth";

export function useAuthApi() {
  const { login, logout } = useAuth();

  return {
    login: async (data: any) => {
      try {
        new Promise((r) => setTimeout(r, 2000));

        const user = {
          name: data.name,
          email: data.email,
        };
        login(user, "token");

        return user;
      } catch (err) {
        console.error(err);
        throw new Error("Falha ao entrar");
      }
    },

    logout: async () => {
      try {
        new Promise((r) => setTimeout(r, 1000));

        logout();
        return true;
      } catch (err) {
        console.error(err);
        throw new Error("Falha ao sair");
      }
    },
  };
}

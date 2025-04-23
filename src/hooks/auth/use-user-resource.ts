import { createResource } from "@/lib/utils";

function fetchUser() {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    return Promise.resolve(JSON.parse(storedUser));
  } else {
    return Promise.resolve(null);
  }
}

export const useUserResource = createResource(fetchUser());

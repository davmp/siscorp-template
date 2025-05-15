import "./index.css";
import "siscorp-ui/style.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { setDefaultOptions } from "date-fns";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import { ptBR } from "date-fns/locale";

import Error from "./components/shared/layout/error";
import NotFound from "./components/shared/layout/not-found";

setDefaultOptions({
  locale: ptBR,
});

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface RegisterRouterInfo {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider
      router={router}
      defaultNotFoundComponent={NotFound}
      defaultErrorComponent={Error}
    />
  </StrictMode>
);

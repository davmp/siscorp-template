import "./index.css";
import "siscorp-ui/style.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { setDefaultOptions } from "date-fns";
import App from "./App.tsx";

import { ptBR } from "date-fns/locale";

setDefaultOptions({
  locale: ptBR,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

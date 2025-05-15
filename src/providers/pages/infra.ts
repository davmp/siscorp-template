import { Package, Plus } from "lucide-react";
import type { Page } from "types/page.type";

const applicationPath = import.meta.env.VITE_APPLICATION_PATH;
const applicationName = import.meta.env.VITE_APPLICATION_NAME;

export const pages = [
  {
    path: applicationPath,
    title: applicationName,
    icon: Package,
    children: [
      {
        path: "/adicionar-contrato",
        name: "Adicionar contrato",
        title: "Contrato",
        icon: Plus,
      },
    ],
  },
] as Page[];

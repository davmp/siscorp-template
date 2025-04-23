import { lazy } from "react";
import { FileCheck, Plus} from "lucide-react";
import type { Page } from "@/types";

export const pages = [
  {
    path: "/pca",
    title: "PCA",
    description: "Plano de Contratação Anual",
    name: "Plano de Contratação Anual",
    icon: FileCheck,
    element: lazy(() => import("@/pages/modules/pca/index/index")),
    children: [
      {
        path: "/adicionar",
        title: "Incluir plano",
        icon: Plus,
        element: lazy(() => import("@/pages/modules/pca/adicionar")),
      },
    ],
  },
] as Page[];

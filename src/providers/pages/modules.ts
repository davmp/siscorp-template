import { lazy } from "react";
import { FileCheck, Plus } from "lucide-react";
import type { Page } from "@/types";

const applicationName = import.meta.env.VITE_APPLICATION_NAME;

export const pages = [
  {
    index: true,
    title: applicationName,
    icon: FileCheck,
    element: lazy(() => import("@/pages/modules/index")),
    children: [
      {
        path: "/submodule",
        title: "Submódulo",
        icon: Plus,
        element: lazy(() => import("@/pages/modules/submodule")),
      },
    ],
  },
] as Page[];

import { getPageByPath } from "providers/pages/pages.provider";
import type { LazyRoute } from "@tanstack/react-router";

export function usePage(route: LazyRoute<any>) {
  const { id } = route.options;

  const { path, title, icon, children } = getPageByPath(id)!;

  const page = {
    path,
    title,
    icon,
    children,
  };

  return page;
}

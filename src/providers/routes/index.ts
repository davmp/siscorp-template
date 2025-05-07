import { type JSX } from "react";
import { RouteObject } from "react-router-dom";
import { mappedPages } from "../pages";
import type { RoutesProps, Page } from "@/types";

const mapPagesToRoutes = (
  pages: Page[],
  withSuspense: (Component: React.LazyExoticComponent<any>) => JSX.Element
): RouteObject[] => {
  return pages.map(
    (page) =>
      ({
        path: page.path,
        element: !page.children && page.element && withSuspense(page.element),
        children: page.children
          ? [
              {
                index: true,
                element: page.element && withSuspense(page.element),
              } as RouteObject,
              ...mapPagesToRoutes(page.children, withSuspense),
            ]
          : page.children && mapPagesToRoutes(page.children, withSuspense),
      } as RouteObject)
  );
};

export const routes = ({ withSuspense }: RoutesProps): RouteObject[] => {
  return mapPagesToRoutes(mappedPages, withSuspense);
};

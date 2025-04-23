import { pages as module } from "./pca";
import type { Page } from "../../types/page";

const _pages = [...module] as Page[];

// Processamento
export const mappedPages = _pages.map((page) => {
  return {
    ...page,
    children: page.children?.map((child: Page) => ({
      ...child,
      path:
        (page.path && page.path !== "/" && `${page.path}${child.path}`) ||
        child.path,
    })),
  };
}) as Page[];

export const pages = mappedPages.filter((page) => !page.avoid);

const mapPages = (pages: Page[]): Page[] => {
  return [...pages, ...pages.flatMap((page) => mapPages(page.children || []))];
};
export const allPages = mapPages(pages);

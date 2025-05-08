import { pages as module } from "./page";
import type { Page } from "../../types/page";

const _pages = [...module] as Page[];

// Processamento
const applicationPath = import.meta.env.VITE_APPLICATION_PATH;

export const mappedPages = _pages.map((page) => {
  return {
    ...page,
    children: page.children?.map((child: Page) => ({
      ...child,
      path: `${!page.path ? applicationPath : page.path}${child.path}`,
    })),
  };
}) as Page[];

export const pages = mappedPages
  .filter((page) => !page.avoid)
  .map((page) => {
    if (page.index) {
      page.path = applicationPath;
    }
    return page;
  });

const mapPages = (pages: Page[]): Page[] => {
  return [...pages, ...pages.flatMap((page) => mapPages(page.children || []))];
};
export const allPages = mapPages(pages);

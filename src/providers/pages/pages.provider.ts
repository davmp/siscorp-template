import type { Page } from "types/page.type";
import { pages as _pages } from "./infra";

export function getPageByPath(path: string): Page {
  if (path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  const page = allPages.find((page) => page.path === path);

  if (!page) {
    console.error(`A página: ${path}`);
    throw new Error("404:");
  }

  return page;
}

function appendParentPath(page: Page, parentPath: string = ""): Page {
  const newPath = `${parentPath}${page.path}`;
  const newChildren = page.children?.map((child) =>
    appendParentPath(child, newPath)
  );
  return { ...page, path: newPath, children: newChildren };
}

export const pages = _pages.map((page) => appendParentPath(page));

export const allPages = pages.reduce((acc: Page[], page) => {
  if (page.children) {
    return [...acc, page, ...page.children];
  }
  return [...acc, page];
}, [] as Page[]);

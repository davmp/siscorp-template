"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "siscorp-ui";
import { SidebarTrigger, useSidebar } from "siscorp-ui";
import { Link, useLocation } from "react-router-dom";
import { allPages } from "@/providers/pages";

export default function HeaderPath() {
  const { isMobile } = useSidebar();
  const { pathname } = useLocation();

  const home = "Início";
  const notFound = "Página não encontrada";

  const crumbs = pathname
    .split("/")
    .filter(Boolean)
    .map((_, index, array) => "/" + array.slice(0, index + 1).join("/"));

  const findTitleByCrumb = (path: string): string => {
    if (!path) return home;
    const page = allPages.find((page) => {
      if (page.path?.includes("/:")) {
        const pathParts = page.path.split("/");
        const crumbParts = path.split("/");
        if (pathParts.length !== crumbParts.length) return false;
        return pathParts.every((part, index) => {
          if (part.startsWith(":")) return true;
          return part === crumbParts[index];
        });
      } else {
        return page.path === path;
      }
    });
    return page?.title || notFound;
  };

  function NormalPathCrumbs({ className }: { className: string }) {
    return (
      <Breadcrumb className={className}>
        <BreadcrumbList>
          <BreadcrumbItem>
            {crumbs?.length > 0 ? (
              <BreadcrumbLink asChild>
                <Link to="/">{home}</Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{home}</BreadcrumbPage>
            )}
          </BreadcrumbItem>

          {crumbs?.length > 0 && !isMobile
            ? crumbs.map((crumb, index) => (
                <React.Fragment key={crumb}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {index === crumbs.length - 1 ? (
                      <BreadcrumbPage>{findTitleByCrumb(crumb)}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={crumb}>{findTitleByCrumb(crumb)}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))
            : crumbs?.length > 0 && (
                <>
                  <BreadcrumbSeparator />
                  {crumbs?.length > 1 && (
                    <>
                      <BreadcrumbItem>
                        <span className="text-muted-foreground">...</span>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                    </>
                  )}
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {findTitleByCrumb(crumbs[crumbs.length - 1])}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  function SmallPathCrumbs({ className }: { className: string }) {
    return (
      <Breadcrumb className={className}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>
              {findTitleByCrumb(crumbs[crumbs.length - 1])}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <div className="flex items-center gap-3 @container/header-path">
      <div className="w-fit border-r-1 border-r-sidebar-border pr-2">
        <SidebarTrigger className="w-7" />
      </div>

      <div className="w-full max-w-full overflow-ellipsis">
        <NormalPathCrumbs className="min-w-max hidden sm:!block @[40%]/header-path:hidden" />
        <SmallPathCrumbs className="min-w-max hidden @[420px]:!block sm:hidden" />
      </div>
    </div>
  );
}

import {
  cn,
  SidebarContent as SidebarContentBase,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "siscorp-ui";
import { pages, allPages } from "providers/pages/pages.provider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import type { Page } from "types/page.type";

function getTooltip(content: React.ReactNode) {
  return {
    sideOffset: 10,
    children: content,
  };
}

const path = import.meta.env.VITE_APPLICATION_PATH;

export default function SidebarContent() {
  const { open, isMobile, openMobile } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  const parent = pages.find((page) => page.path === path);

  const selectedPage = allPages.find((page) => page.path === location.pathname);
  const selectedParentPage = selectedPage?.children ? selectedPage : parent;
  const visiblePages: Page[] =
    selectedPage?.children ?? parent?.children ?? pages;

  const handleBackNavigation = () => {
    const pathSegments = location.pathname.split("/");
    const newPath = pathSegments.slice(0, -1).join("/") || "/";
    navigate({ to: newPath });
  };

  const renderPageItem = (page: Page) => {
    const isSamePath = page.path === location.pathname;
    const ElementTag = isSamePath ? "div" : "a";

    return (
      <SidebarMenuItem key={page.title}>
        <SidebarMenuButton
          asChild
          tooltip={getTooltip(page.name || page.title)}
        >
          <ElementTag
            {...(!isSamePath && { href: page.path })}
            className={cn(
              "cursor-pointer",
              isSamePath && "bg-[var(--border)]/30"
            )}
          >
            <page.icon />
            <span>{page.title}</span>
          </ElementTag>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  const renderPageGroup = (page: Page) => (
    <Collapsible className="group/collapsible" key={page.title}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            asChild
            tooltip={getTooltip(page.title)}
            onClick={() => {
              if (
                !open ||
                (isMobile && !openMobile && page.path !== location.pathname)
              ) {
                page.path && navigate({ to: page.path });
              }
            }}
          >
            <a className="cursor-pointer *:text-primary-dark">
              <page.icon />
              <span>{page.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 rotate-90 group-data-[state=open]/collapsible:-rotate-90" />
            </a>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {page.children?.map((subPage) => (
              <SidebarMenuSubItem key={subPage.title}>
                <SidebarMenuSubButton asChild>
                  <a href={subPage.path}>
                    <span>{subPage.title}</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );

  return (
    <SidebarContentBase className="bg-inherit">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-1">
              <SidebarMenuButton
                asChild
                tooltip={getTooltip("Voltar")}
                onClick={handleBackNavigation}
              >
                <a className="hover:!bg-transparent cursor-pointer flex items-center opacity-50 !gap-1">
                  <ChevronLeft className="!w-4 !h-4" />
                  <span className="pointer-events-none text-xs">
                    {selectedParentPage && selectedParentPage !== selectedPage
                      ? selectedParentPage.title
                      : "Início"}
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {visiblePages.map((page) =>
              page.children ? renderPageGroup(page) : renderPageItem(page)
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContentBase>
  );
}

import {
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
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { pages, allPages } from "@/providers/pages";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Page } from "@/types/page";

function findParent(page?: Page) {
  if (page) {
    for (const parent of pages) {
      if (parent.children?.some((child) => child.path === page.path)) {
        return parent;
      }
    }
  }
}

function getTooltip(content: React.ReactNode) {
  return {
    arrowClassName: "!hidden",
    sideOffset: 10,
    children: content,
  };
}

export default function SidebarContent() {
  const { open, isMobile, openMobile } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedPage = allPages.find((page) => page.path === location.pathname);
  const selectedParentPage =
    selectedPage && selectedPage.children
      ? selectedPage
      : findParent(selectedPage);
  const visiblePages: Page[] =
    (selectedPage && selectedPage?.children) ||
    findParent(selectedPage)?.children ||
    pages;
  const isCustomSelectedPage = visiblePages !== pages;

  const handleBackNavigation = () => {
    navigate(location.pathname.split("/").slice(0, -1).join("/"));
  };

  const renderPageItem = (page: Page) => (
    <SidebarMenuItem key={page.title}>
      <SidebarMenuButton asChild tooltip={getTooltip(page.name || page.title)}>
        <a href={page.path} className="cursor-pointer">
          <page.icon />
          <span>{page.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  const renderPageGroup = (page: Page) => (
    <Collapsible className="group/collapsible" key={page.title}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            asChild
            tooltip={getTooltip(page.title)}
            onClick={() => {
              !open ||
                (isMobile && !openMobile && page.path && navigate(page.path));
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
            {isCustomSelectedPage && selectedParentPage && (
              <SidebarMenuItem className="flex items-center gap-1">
                <SidebarMenuButton
                  asChild
                  tooltip={getTooltip("Voltar")}
                  onClick={handleBackNavigation}
                >
                  <a className="hover:!bg-transparent cursor-pointer flex items-center opacity-50 !gap-1">
                    <ChevronLeft className="!w-4 !h-4" />
                    <span className="pointer-events-none text-xs">
                      {selectedParentPage === selectedPage
                        ? "Início"
                        : selectedParentPage.title}
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
            {visiblePages.map((page) =>
              page.children ? renderPageGroup(page) : renderPageItem(page)
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContentBase>
  );
}

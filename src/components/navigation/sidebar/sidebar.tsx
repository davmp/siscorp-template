import { Sidebar as SidebarBase } from "siscorp-ui";
import { SidebarHeader, SidebarContent, SidebarFooter } from "./components";

export default function Sidebar() {
  return (
    <SidebarBase
      className="w-[var(--sidebar-width_)] h-full *:bg-card z-10"
      collapsible="icon"
    >
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter />
    </SidebarBase>
  );
}

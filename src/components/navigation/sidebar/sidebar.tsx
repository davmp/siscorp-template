import { Sidebar as SidebarBase } from "../../ui/sidebar";
import { SidebarHeader, SidebarContent, SidebarFooter } from "./components";

export default function Sidebar() {
  return (
    <SidebarBase
      className="w-[var(--sidebar-width_)] h-full *:bg-card"
      collapsible="icon"
    >
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter />
    </SidebarBase>
  );
}

import { SidebarFooter as SidebarFooterBase, SidebarMenu } from "siscorp-ui";
import SidebarProfileDropdown from "./sidebar-profile-dropdown";
import { useAuth } from "@/hooks/auth/use-auth";

export default function SidebarFooter() {
  const { user } = useAuth();

  return (
    <SidebarFooterBase>
      <SidebarMenu>
        {user && <SidebarProfileDropdown user={user} />}
      </SidebarMenu>
    </SidebarFooterBase>
  );
}

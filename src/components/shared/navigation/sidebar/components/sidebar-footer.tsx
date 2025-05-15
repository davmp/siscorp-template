import { SidebarFooter as SidebarFooterBase, SidebarMenu } from "siscorp-ui";
import SidebarProfileDropdown from "./sidebar-profile-dropdown";

export default function SidebarFooter() {
  const user = {
    username: "john.doe",
    name: "John Doe",
    email: "john.doe@gmail.com",
    avatar:
      "https://images.pexels.com/photos/16299765/pexels-photo-16299765/free-photo-of-businessman-wearing-suit-and-necktie.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
  };

  return (
    <SidebarFooterBase>
      <SidebarMenu>
        <SidebarProfileDropdown user={user} />
      </SidebarMenu>
    </SidebarFooterBase>
  );
}

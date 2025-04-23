import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BellIcon,
  HelpCircle,
  LogOutIcon,
  MoreVerticalIcon,
  Settings,
} from "lucide-react";
import { useAuthApi } from "@/hooks/auth/use-auth-api";
import { toast } from "sonner";
import type { User } from "@/lib/auth-type";
import { useNavigate } from "react-router-dom";

export default function SidebarProfileDropdown({ user }: { user: User }) {
  const { logout } = useAuthApi();
  const { isMobile } = useSidebar();
  const navigate = useNavigate();

  const nameInitials = (username: string) =>
    username
      .split(" ")
      .splice(0, 2)
      .map((name) => name.slice(0, 1).toUpperCase());

  async function handleLogout() {
    const response = await logout();

    if (response) {
      toast("Até logo! 👋");
      navigate("/entrar");
    } else {
      console.error("Erro no logout");
    }
  }

  const dropdownItems = [
    {
      value: "/notificações",
      title: "Notificações",
      icon: BellIcon,
    },
    {
      value: "/ajuda",
      title: "Ajuda",
      icon: HelpCircle,
    },
    {
      value: "/configuracoes",
      title: "Configurações",
      icon: Settings,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-primary-light/20 data-[state=open]:text-primary"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.avatar} alt={user.email} />
            <AvatarFallback>{nameInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {user.email}
            </span>
          </div>
          <MoreVerticalIcon className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-lg">
                {nameInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {dropdownItems.map((item) => (
          <DropdownMenuItem key={item.value} asChild>
            <a href={item.value}>
              <item.icon />
              {item.title}
            </a>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

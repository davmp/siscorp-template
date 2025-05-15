import { SidebarMenuButton, useSidebar } from "siscorp-ui";
import { Avatar, AvatarFallback, AvatarImage } from "siscorp-ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "siscorp-ui";
import {
  BellIcon,
  HelpCircle,
  LogOutIcon,
  MoreVerticalIcon,
  Settings,
} from "lucide-react";
import { toast } from "sonner";

export default function SidebarProfileDropdown({ user }: { user: any }) {
  const { isMobile } = useSidebar();

  const nameInitials = (username: string) =>
    username
      .split(" ")
      .splice(0, 2)
      .map((name) => name.slice(0, 1).toUpperCase());

  async function handleLogout() {
    toast("Até logo! 👋");
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
          className="data-[state=open]:bg-[var(--primary-light)]/20 data-[state=open]:text-primary"
        >
          {/* @ts-ignore */}
          <Avatar className="h-8 w-8 rounded-lg">
            {/* @ts-ignore */}
            <AvatarImage src={user.avatar} alt={user.email} />
            {/* @ts-ignore */}
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
            {/* @ts-ignore */}
            <Avatar className="h-8 w-8 rounded-lg">
              {/* @ts-ignore */}
              <AvatarImage src={user.avatar} alt={user.name} />
              {/* @ts-ignoreß */}
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

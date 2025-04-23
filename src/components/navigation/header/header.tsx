import { HeaderPath, HeaderActions } from "./components";
import { useSidebar } from "@/components/ui/sidebar";

export default function Header() {
  const { isMobile } = useSidebar();

  return (
    <nav className="z-10 sticky inset-[0_0_auto_var(--sidebar-width_)] h-[var(--header-height)] bg-background/80 backdrop-blur-md">
      <div
        className={`w-full h-full flex items-center justify-between ${
          isMobile ? "px-2" : "pr-6 pl-2"
        }`}
      >
        <HeaderPath />
        <HeaderActions />
      </div>
    </nav>
  );
}

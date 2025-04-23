import {
  SidebarHeader as SidebarHeaderBase,
  useSidebar,
} from "@/components/ui/sidebar";
import siscorp from "@/assets/siscorp.svg";
import logo from "@/assets/logo-small.svg";

export default function SidebarHeader() {
  const { open, isMobile, openMobile } = useSidebar();
  const showTitle = isMobile ? openMobile : open;

  return (
    <SidebarHeaderBase className="h-[var(--header-height)] bg-inherit">
      <a href="/" className="select-none flex items-center gap-2">
        <div
          className={`rounded-sm ${
            !open ? "mx-autoa" : "min-w-7"
          } ml-0.5 w-7 h-7 p-1 pointer-events-none select-none bg-primary-light`}
        >
          <img src={logo} className="select-none w-full h-full" />
        </div>
        {showTitle && <img src={siscorp} className="select-none h-5 mr-2" />}
      </a>
    </SidebarHeaderBase>
  );
}

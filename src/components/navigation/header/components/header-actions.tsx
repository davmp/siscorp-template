import { Button as ButtonBase } from "@/components/ui/button";
import { Bell, Settings } from "lucide-react";
import SearchBox from "./header-searchbox";

export default function HeaderActions() {
  function Button({ children }: { children: React.ReactNode }) {
    return <ButtonBase className="w-10">{children}</ButtonBase>;
  }

  return (
    <div className="flex items-center gap-2 min-w-fit">
      <SearchBox />

      <div className="items-center gap-2 hidden md:flex">
        <Button>
          <Settings />
        </Button>

        <Button>
          <Bell />
        </Button>
      </div>
    </div>
  );
}

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { allPages } from "@/providers/pages";

export default function SearchBox() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const placeholder = "Pesquisar página...";

  const filteredPages = allPages.filter((page) => {
    const normalize = (str: string) =>
      str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    const title = normalize(page.title);
    const name = normalize(page.name || "");
    const term = normalize(searchTerm);

    const initials = title
      .split(/\s+/)
      .map((word) => word[0])
      .join("");

    return (
      title.includes(term) || initials.includes(term) || name.includes(term)
    );
  });
  const visiblePages = filteredPages.slice(0, 5);

  const selectedPageTitle =
    pathname && allPages.find((page) => page.path === pathname)?.title;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[200px] justify-between !text-sm ${
            !!selectedPageTitle ? "text-foreground" : "text-gray-500/50"
          }`}
        >
          {selectedPageTitle || placeholder}
          <ChevronsUpDown className="text-foreground opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={placeholder}
            className="h-9"
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>
            <CommandEmpty>Não encontrada.</CommandEmpty>
            <CommandGroup>
              {visiblePages.map((page) => (
                <CommandItem
                  key={page.title}
                  value={page.path}
                  onSelect={(currentValue) => {
                    pathname !== currentValue && navigate(currentValue);
                    setOpen(false);
                  }}
                >
                  {page.title}
                  <Check
                    className={`ml-auto ${
                      pathname === page.path ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

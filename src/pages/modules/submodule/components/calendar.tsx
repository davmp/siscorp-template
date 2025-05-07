import { Button, type CalendarProps } from "siscorp-ui";
import { Popover, PopoverTrigger, PopoverContent, Calendar } from "siscorp-ui";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export function CalendarInput({
  selected,
  onSelect,
  name,
  disabled,
  placeholder,
  isDisabled,
  ...props
}: CalendarProps & {
  selected?: Date;
  onSelect: (date?: Date) => void;
  name?: string;
  isDisabled?: boolean;
  placeholder?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={isDisabled}
          variant="outline"
          className={
            "w-full bg-card border-input hover:bg-card hover:text-[var(--foreground)]"
          }
        >
          {selected
            ? format(selected, "PPP")
            : placeholder || "Selecione uma data"}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          {...props}
          mode="single"
          selected={selected}
          onSelect={onSelect}
        />
      </PopoverContent>
      <input
        type="hidden"
        className="hidden"
        name={name}
        value={selected?.toISOString()}
        onChange={(_) => {}}
      />
    </Popover>
  );
}

import { Button } from "siscorp-ui";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Calendar as CalendarBase,
} from "siscorp-ui";
import { CalendarIcon } from "lucide-react";
import { Matcher } from "siscorp-ui";

export function Calendar({
  field,
  disabled,
  disabledDates,
  min,
}: {
  field: { value: Date | undefined; onChange: (date: Date | undefined) => void };
  disabled?: boolean;
  disabledDates?: Matcher | Matcher[] | undefined;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button disabled={disabled} variant="outline" className="w-full bg-card border-input hover:bg-card hover:text-foreground">
          {field.value ? field.value.toLocaleDateString("pt-BR") : "Selecione uma data"}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarBase
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={disabledDates}
          
        />
      </PopoverContent>
    </Popover>
  );
}

import { useEffect, useState } from "react";
import { Input } from "siscorp-ui";

function formatCurrency(value: string): string {
  if (!value || isNaN(Number(value))) return "";
  const number = parseFloat(value) / 100;
  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function unformatCurrency(value: string): string {
  return value.replace(/\D/g, "");
}

interface CurrencyInputProps {
  value?: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
  id?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

export function CurrencyInput({
  value = "",
  onChange,
  placeholder = "R$ 0,00",
  id,
  disabled,
  className = "",
  readOnly,
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState(formatCurrency(value));

  useEffect(() => {
    setDisplayValue(formatCurrency(String(value)));
  }, [value]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = unformatCurrency(e.target.value);
    const numericValue = parseFloat(raw);

    if (numericValue < 1) {
      setDisplayValue("");
      if (onChange) onChange("");
      return;
    }

    const formatted = formatCurrency(raw);
    setDisplayValue(formatted);
    if (onChange) onChange(raw);
  };

  return (
    <div className={className}>
      <Input
        id={id}
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
    />
  </div>
  );
}


"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "siscorp-ui";
import { useState } from "react";

interface YearPickerProps {
  startYear?: number;
  endYear?: number;
  onYearChange: (year: number) => void;
}

export function YearPicker({ startYear = 1980, endYear = new Date().getFullYear(), onYearChange }: YearPickerProps) {
  const [selectedYear, setSelectedYear] = useState<string>("");

  const handleChange = (value: string) => {
    setSelectedYear(value);
    onYearChange(Number(value));
  };

  const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index).reverse();

  return (
    <Select value={selectedYear} onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione o ano" />
      </SelectTrigger>
      <SelectContent className="max-h-40">
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}


import { useState, useEffect, JSX } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "siscorp-ui";
import { Label } from "siscorp-ui";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "siscorp-ui";
import { addMonths} from "date-fns";
import { CurrencyInput } from "./currencyInput";

interface DisbursementForecastProps {
  totalContractValue: number;
  totalMonths: number;
  startDate: string; 
}

const monthsNames = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default function PrevisionCard({ totalContractValue, totalMonths, startDate }: DisbursementForecastProps) {
  const [disbursementType, setDisbursementType] = useState<number>(1); // 1 = Mensal, 2 = Anual
  const [showMessage, setShowMessage] = useState(false);
  const [yearList, setYearList] = useState<number[]>([]);
  const [monthlyValues, setMonthlyValues] = useState<Record<string, number>>({});
  const [annualValues, setAnnualValues] = useState<Record<number, { month: string; value: number }>>({});


  useEffect(() => {
    if (startDate && totalMonths >= 1 && totalMonths <= 60) {
      const start = new Date(startDate);
      const years = new Set<number>();
  
      for (let i = 0; i < totalMonths; i++) {
        const current = new Date(start);
        current.setMonth(current.getMonth() + i);
        years.add(current.getFullYear());
      }
  
      if (years.size === 0) {
        years.add(start.getFullYear());
      }
  
      setYearList(Array.from(years));
    }
  }, [startDate, totalMonths]);

  useEffect(() => {
    if (
      startDate &&
      totalContractValue > 0 &&
      totalMonths > 0 &&
      disbursementType === 1
    ) {
      const start = new Date(startDate);
      const monthly = parseFloat((totalContractValue / totalMonths).toFixed(2));
      const newMonthlyValues: Record<string, number> = {};
      for (let i = 1; i <= totalMonths; i++) {
        const date = new Date(start);
        date.setMonth(date.getMonth() + i);
        const key = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}`;
        newMonthlyValues[key] = monthly;
      }
  
      const keys = Object.keys(newMonthlyValues);
      const totalCalculated = Object.values(newMonthlyValues).reduce((acc, val) => acc + val, 0);
      const diff = parseFloat((totalContractValue - totalCalculated).toFixed(2));
  
      if (diff !== 0 && keys.length > 0) {
        const lastKey = keys[keys.length - 1];
        newMonthlyValues[lastKey] = parseFloat(
          (newMonthlyValues[lastKey] + diff).toFixed(2)
        );
      }
  
      console.log("monthlyValues calculados:", newMonthlyValues);
      setMonthlyValues(newMonthlyValues);
    }
  }, [startDate, totalContractValue, totalMonths, disbursementType]);
  

  const renderMonthlyFields = (year: number) => {
    const start = new Date(startDate);
    const contractStart = new Date(start);
    
    const contractEnd = addMonths(contractStart, totalMonths);
    
    const months = [];


    for (let month = 0; month < 12; month++) {
      const key = `${year}-${String(month).padStart(2, '0')}`;
      const currentDate = new Date(year, month);

      const isWithinContract =
        currentDate >= contractStart && currentDate <= contractEnd;

      const isOutOfContract = !isWithinContract;

      const rawValue = monthlyValues[key];
      const value = isWithinContract && typeof rawValue === "number" ? rawValue : 0;

        months.push(
          <div key={key} className="flex flex-col gap-1 w-48">
            <Label className={isOutOfContract ? "text-gray-400" : ""}>
              {monthsNames[month]}
            </Label>
            <CurrencyInput
              value={value.toFixed(2)}
              onChange={() => {}}
              placeholder="R$ 0,00"
              disabled
              className={isOutOfContract ? "bg-gray-100 text-gray-500" : "bg-white text-black"}
              id={key}
            />
          </div>
        );
      }
    
    return months;
  };

  const renderAnnualFields = (year: number) => {
    const options: JSX.Element[] = [];
    const start = new Date(startDate);
    const startMonth = start.getMonth();
    const contractStartYear = start.getFullYear();
    const contractEnd = addMonths(start, totalMonths - 1);
    const contractEndYear = contractEnd.getFullYear();
    const totalYears = contractEndYear - contractStartYear + 1;
    const valorAnual = parseFloat((totalContractValue / totalYears).toFixed(2));
  
    for (let month = 0; month < 12; month++) {
      const isEnabled =
        (year === contractStartYear && month > startMonth) ||
        (year > contractStartYear && year <= contractEndYear);
  
      if (isEnabled) {
        options.push(
          <SelectItem key={`${year}-${month}`} value={String(month)}>
            {monthsNames[month]}
          </SelectItem>
        );
      }
    }
  
    return (
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1">
          <Label>Mês do Pagamento</Label>
          <Select
            onValueChange={(value) => {
              const monthIndex = Number(value);
              setAnnualValues((prev) => ({
                ...prev,
                [year]: { month: monthsNames[monthIndex], value: valorAnual },
              }));
            }}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  annualValues[year]?.month || "Selecione o mês"
                }
              />
            </SelectTrigger>
            <SelectContent>{options}</SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1 w-48">
          <Label>Valor do Pagamento</Label>
          <CurrencyInput
            value={
              annualValues[year]?.value
                ? String(Math.round(annualValues[year].value))
                : ""
            }
            onChange={() => {}}
            placeholder="R$ 0,00"
            id={`annual-${year}`}
            disabled
          />
        </div>
      </div>
    );
  };
  

  if (!totalContractValue || !totalMonths || totalMonths < 1 || totalMonths > 60) return null;

  return (
    <Card className="w-full flex flex-col px-4 py-6 mt-6">
      <CardHeader>
        <CardTitle>Previsão de Desembolso da Nova Contratação</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Label>Tipo de Desembolso*</Label>
          <Select
            defaultValue="1"
            onValueChange={(value) => {
              setDisbursementType(Number(value));
              setShowMessage(true);
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Mensal</SelectItem>
              <SelectItem value="2">Anual</SelectItem>
            </SelectContent>
          </Select>
          {showMessage && (
            <div className="text-sm text-muted-foreground ml-4">
              {disbursementType === 1
                ? "Para o desembolso Mensal, o pagamento é feito todos os meses durante o ano de vigência do contrato, a partir do mês subsequente a assinatura do contrato."
                : "Para o desembolso Anual, o pagamento é feito apenas uma vez a cada ano de vigência do contrato, conforme o mês de pagamento apontado."}
            </div>
          )}
        </div>
        {yearList.map((year) => (
          <div key={year} className="border rounded-xl p-4 space-y-4">
            <h2 className="font-semibold">Valores Planejados - Ano {year}</h2>
            {disbursementType === 1 ? (
              <div className="flex flex-wrap gap-4">{renderMonthlyFields(year)}</div>
            ) : (
              renderAnnualFields(year)
            )}
            <div className="mt-4 gap-4 flex items-center">
              <Label>Valor Total do Exercício</Label>
              <CurrencyInput
                disabled
                value={
                  disbursementType === 1
                    ? Object.entries(monthlyValues)
                        .filter(([key]) => key.startsWith(`${year}-`))
                        .reduce((acc, [, val]) => acc + val, 0)
                    : (annualValues[year]?.value || 0) 
                }
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

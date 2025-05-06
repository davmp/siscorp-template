"use client";
import { Calendar } from "./calendar";
import { Input } from "siscorp-ui";
import { Label } from "siscorp-ui";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "siscorp-ui";
import { YearPicker } from "./yearPicker";
import { Textarea } from "siscorp-ui";
import { Card, CardHeader, CardTitle, CardContent } from "siscorp-ui";

interface BasicDataCardProps {
  dateInclusion: string;
  code: string;
  description: string;
  year: number | null;
  onChangeDateInclusion: (value: string) => void;
  onChangeCode: (value: string) => void;
  onChangeDescription: (value: string) => void;
  onYearChange: (year: number) => void;
}

export function BasicDataCard({
  dateInclusion,
  code,
  description,
  onChangeDateInclusion,
  onChangeCode,
  onChangeDescription,
  onYearChange,
}: BasicDataCardProps) {
  return (
    <Card className="w-full flex flex-col px-4 py-6">
      <CardHeader>
        <CardTitle>Dados Básicos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full mt-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="dateInclusion">Data de Inclusão</Label>
            <Calendar
              field={{
                value: dateInclusion ? new Date(dateInclusion) : undefined,
                onChange: (date) => onChangeDateInclusion(date?.toISOString() || ""),
              }}
              disabledDates={(date) => date > new Date()}
            />
            {dateInclusion && (
                    <span className="text-xs text-muted-foreground">Esta data é calculada automaticamente.</span>
                  )}
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="code">Código</Label>
            <Input
              id="code"
              type="text"
              maxLength={4}
              placeholder="Código"
              value={code}
              onChange={(e) => onChangeCode(e.target.value)}
              disabled
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Tipo</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tipo de Contrato" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="cus">Custeio</SelectItem>
                  <SelectItem value="inv">Investimento</SelectItem>
                  <SelectItem value="pes">Pessoal</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label>Status do Contrato</Label>
            <Select defaultValue="ativo">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ativo">ATIVO</SelectItem>
                  <SelectItem value="inativo">INATIVO</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label>Unidade Gestora (UG)</Label>
            <Select>
              <SelectTrigger className="w-full max-w-[300px] truncate">
                <SelectValue placeholder="Selecionar UG" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="275075" className="truncate">
                  275075 - VALEC ENGENHARIA, CONSTRUÇÕES E FERROVIAS S/A
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full mt-10">
          <div className="flex flex-col gap-1">
            <Label>Evento</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecionar Evento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exemplo">Evento Exemplo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1 ">
            <Label>Ano</Label>
            <YearPicker onYearChange={onYearChange} />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Empresa</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="valec">VALEC</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label>Área Responsável</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="supti">SUPTI</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full mt-10">
          <div className="flex flex-col gap-1">
            <Label>Plano Orçamentário</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="plano1">Plano1</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label>Natureza da Despesa</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="natureza1">Natureza 1</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label>Elemento da Despesa</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="elemento1">Elemento 1</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full flex flex-col items-start gap-4 mt-10">
          <div className="w-full flex flex-col gap-2">
            <Label>Descrição</Label>
            <Textarea
              placeholder="Descrição"
              className="w-full"
              value={description}
              onChange={(e) => onChangeDescription(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { Calendar } from "./calendar";
import { useState,useEffect } from "react";
import { Input, Label, Textarea, Tooltip } from "siscorp-ui";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "siscorp-ui";
import { Card, CardContent, CardHeader, CardTitle } from "siscorp-ui";
import { CurrencyInput } from "./currencyInput";
import PrevisionCard from "./PrevisionCard";


import { addBusinessDays, subBusinessDays } from "date-fns"; 


interface NewHiringDataCardProps {
  dateContract: string;
  dateDocument: string;
  dateFinalContract: string;
  nextActive: string;
  document: string;
  justification: string;
  totalMonths: string;
  totalContractValue: string;
  onChangeDateContract: (value: string) => void;
  onChangeDateDocument: (value: string) => void;
  onChangeNextActive: (value: string) => void;
  onChangeDocument: (value: string) => void;
  onChangeJustification: (value: string) => void;
  onChangeTotalMonths: (value: string) => void;
  onChangeTotalContractValue: (value: string) => void;
}

export function NewHiringDataCard({
  dateContract,
  dateFinalContract,
  nextActive,
  document,
  justification,
  totalMonths,
  totalContractValue,
  onChangeDateContract,
  onChangeNextActive,
  onChangeDocument,
  onChangeJustification,
  onChangeTotalMonths,
  onChangeTotalContractValue,
}: NewHiringDataCardProps) {
    const [tipoLicitacao, setTipoLicitacao] = useState("");
    const [dataCadastro] = useState(new Date());
    const [dataEntrega, setDataEntrega] = useState("");
    

    const calcularDataMinima = () => {
        const dias = tipoLicitacao === "pe" ? 123 : tipoLicitacao === "rle" ? 183 : tipoLicitacao === "di" ? 48 : 0;
        return addBusinessDays(dataCadastro, dias);
    };

    useEffect(() => {
        if (!dateContract || !tipoLicitacao) return;
    
        const data = new Date(dateContract);
        const dias = tipoLicitacao === "pe" ? 120 : tipoLicitacao === "rle" ? 180 : tipoLicitacao === "di" ? 45 : 0;
        const entrega = subBusinessDays(data, dias);
        setDataEntrega(entrega.toISOString().split("T")[0]);
    }, [dateContract, tipoLicitacao]);

  return (
    <>
        <Card className="w-full flex flex-col px-4 py-6">
          <CardHeader>
            <CardTitle>Dados da Nova Contratação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full mt-4">
              <div className="flex flex-col gap-1 col-span-1">
                <Label>Tipo de Licitação</Label>
                <Select onValueChange={setTipoLicitacao}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Tipo de Licitação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="pe">Pregão Eletrônico</SelectItem>
                      <SelectItem value="rle">Regime de Licitação dos Estatais</SelectItem>
                      <SelectItem value="di">Dispensas e Inexigibilidades</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1 col-span-1">
                <Label htmlFor="dateContract">Data Assinatura do Contrato</Label>
                <Calendar
                    field={{
                      value: dateContract ? new Date(dateContract) : undefined,
                      onChange: (date) => onChangeDateContract(date?.toISOString() || ""),
                    }}
                    disabled={!tipoLicitacao}
                    min={tipoLicitacao ? calcularDataMinima().toISOString().split("T")[0] : ""}
                    type="date"
                    value={dateContract}
                    onChange={(e) => onChangeDateContract(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1 col-span-1">
                <Label htmlFor="dateDocument">Data Entrega da Documentação</Label>
                <Input
                  id="dateDocument"
                  type="date"
                  value={dataEntrega}
                  disabled
                  />
                  {dataEntrega && (
                    <span className="text-xs text-muted-foreground">Esta data é calculada automaticamente.</span>
                  )}
              </div>
              <div className="flex flex-col gap-1 col-span-1">
                <Label>Mapa Estratégico</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Mapa Estratégico" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="m1">Mapa 1</SelectItem>
                      <SelectItem value="m2">Mapa 2</SelectItem>
                      <SelectItem value="m3">Mapa 3</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1 col-span-1">
                <Label>Objetivo Estratégico</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Objetivo Estratégico" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="obj1">Objetivo 1</SelectItem>
                      <SelectItem value="obj2">Objetivo 2</SelectItem>
                      <SelectItem value="obj3">Objetivo 3</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full mt-10">
              <div className="flex flex-col gap-1 col-span-1">
                <Label>Prioridade</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="low">Baixa</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1 col-span-1">
                <Label>Sigiloso?</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sigiloso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="sim">Sim</SelectItem>
                      <SelectItem value="nao">Não</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1 col-span-1">
                <Label htmlFor="nextActive">Valor Total do Próximos Exercícios</Label>
                <CurrencyInput
                  id="nextActive"
                  placeholder="R$ 0,00"
                  value={nextActive}
                  onChange={(e) => onChangeNextActive(e)}
                />
              </div>
              <div className="flex flex-col gap-1 col-span-1">
                <Label htmlFor="document">Documento SEI de Aprovação do DIREX</Label>
                <Input
                  id="document"
                  type="text"
                  maxLength={5}
                  placeholder="Inserir número do documento"
                  value={document}
                  onChange={(e) => onChangeDocument(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full flex flex-col items-start gap-4 mt-10">
              <div className="w-full flex flex-col gap-2">
                <Label>Justificativa da Nova Contratação</Label>
                <Textarea
                  placeholder="justificativa"
                  className="w-full"
                  value={justification}
                  onChange={(e) => onChangeJustification(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full flex flex-col px-4 py-6 mt-4">
          <CardHeader>
            <CardTitle>Previsão de Duração da Nova Contratação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full mt-4">
              <div className="flex flex-col gap-1 col-span-1">
                <Label>Total de Meses</Label>
                <Input
                  id="totalMonths"
                  type="text"
                  placeholder="Total de Meses"
                  value={totalMonths}
                  min={1}
                  max={60}
                  onChange={(e) => onChangeTotalMonths(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1 col-span-1">
                <Label htmlFor="dateContract">Data de Início do Contrato</Label>
                <Input
                    id="dateContract"
                    type="date"
                    value={dateContract}
                    disabled
                />
                {dateContract && (
                    <span className="text-xs text-muted-foreground">Esta data é calculada automaticamente.</span>
                  )}
              </div>
              <div className="flex flex-col gap-1 col-span-1">
                <Label htmlFor="dateFinalContract">Data de Final do Contrato</Label>
                <Input
                  id="dateFinalContract"
                  type="date"
                  value={dateFinalContract}
                  disabled
                />
                {dateFinalContract && (
                    <span className="text-xs text-muted-foreground">Esta data é calculada automaticamente.</span>
                  )}
              </div>
              <div className="flex flex-col gap-1 col-span-1">
                <Label htmlFor="totalContractValue">Valor Total do Contrato</Label>
                <CurrencyInput
                  id="totalContractValue"
                  placeholder="R$ 0,00"
                  value={totalContractValue}
                  onChange={(e) => onChangeTotalContractValue(e)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <PrevisionCard
            key={`${dateContract}-${totalMonths}-${totalContractValue}`} 
            totalContractValue={Number(totalContractValue) || 0}
            totalMonths={Number(totalMonths) || 0}
            startDate={dateContract}
         />

    </>
  );
}

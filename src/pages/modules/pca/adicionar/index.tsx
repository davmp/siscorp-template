import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
 
export default function index() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [isNew, setIsNew] = useState(false);
 
  return (
    <section className="mx-auto flex flex-col">
      <h1 className="text-3xl sm:text-4xl">Adicionar Contrato</h1>
      <form className="w-full max-w-lg mx-auto flex flex-col items-center gap-4">
        <div className="w-full flex flex-col items-start gap-4">
          <div className="grid grid-cols-[3fr_1fr] gap-4 w-full">
            <Input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
 
            <Input
              type="number"
              maxLength={3}
              placeholder="Código"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
 
          <div className="w-full">
            <Textarea
              placeholder="Descrição"
              className="w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
 
          <div className="flex items-center space-x-2">
            <Label htmlFor="airplane-mode">Contrato novo</Label>
            <Switch checked={isNew} onCheckedChange={setIsNew} />
          </div>
        </div>
 
        <Collapsible open={isNew}>
          <CollapsibleContent>
            <Card>
              <CardHeader>
                <CardTitle>Dados da Nova Contratação</CardTitle>
              </CardHeader>
 
              <CardContent className="w-full flex flex-col items-start gap-4">
                <div className="grid grid-cols-[5fr_3fr] gap-4 w-full">
                  <Input type="text" placeholder="Nome" />
 
                  <Select>
                    <SelectTrigger>
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
 
                <div className="grid grid-cols-[3fr_1fr] gap-4 w-full">
                  <Input type="text" placeholder="Ano" />
 
                  <Input
                    type="number"
                    maxLength={3}
                    placeholder="Código"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
 
                <div className="w-full">
                  <Textarea
                    placeholder="Descrição"
                    className="w-full"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
 
        <div className="w-full flex items-center justify-end gap-2">
          <Button variant="outline">Cancelar</Button>
          <Button>Salvar</Button>
        </div>
      </form>
    </section>
  );
}

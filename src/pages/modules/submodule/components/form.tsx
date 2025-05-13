//@ts-nocheck
import {
  Input,
  Label,
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectTrigger,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogFooter,
  Loader,
  Textarea,
  AlertDialogCancel,
  toast,
  type LabelProps,
} from "siscorp-ui";
import { CalendarInput } from "./calendar";

import { handleSubmit } from "./form-actions";
import { useActionState, useEffect, useState } from "react";

const FormField = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

const values = [
  { label: "Movimentação", value: "movimentacao" },
  { label: "Habilidade", value: "habilidade" },
  { label: "Comunicação", value: "comunicacao" },
  { label: "Externo", value: "externo" },
];

const Form = () => {
  const [result, handleRegisterUser, isPending] = useActionState(
    handleSubmit,
    null
  );

  const [date, setDate] = useState<Date | undefined>();
  const [isOpenDialog, setIsOpen] = useState(false);

  useEffect(() => {
    if (result) {
      setIsOpen(true);

      // Exibir os dados do registro
      toast.success("Registro criado com sucesso", {
        duration: 5000,
      });
    }
  }, [result]);

  return (
    <form action={handleRegisterUser} className="w-full flex flex-col gap-4">
      {/* Cabeçalho */}
      <section>
        <h1 className="text-xl sm:text-2xl">Formulário</h1>
        <p className="text-sm text-muted-foreground">
          Preencha os campos abaixo para adicionar um novo registro.
        </p>
      </section>

      {/* Corpo */}
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
          {/* Campo [Nome Completo] */}
          <FormField>
            <Label
              {...({
                htmlFor: "dat",
                required: true,
                children: "Data",
              } as LabelProps)}
            />
            <Input
              id="name"
              name="name"
              placeholder="Nome do registro"
              defaultValue={"Registro nº 10 - Habilidade de Comunicação"}
              disabled={isPending}
              required
            />
          </FormField>

          {/* Campo [Categproa] */}
          <FormField>
            <Label
              {...{
                htmlFor: "cat",
                required: true,
                children: "Categoria",
              }}
            />
            <Select name="cat" required disabled={isPending}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {values.map((val) => (
                    <SelectItem key={val.value} value={val.value}>
                      {val.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Campo [Email] */}
          <FormField>
            <Label
              {...({
                htmlFor: "email",
                children: "Email",
              } as LabelProps)}
            />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email do registro"
              defaultValue="suporte.use@infrasa.gov.br"
              disabled={isPending}
            />
          </FormField>

          {/* Campo [Data] */}
          <FormField>
            <Label
              {...({
                htmlFor: "dat",
                children: "Data",
              } as LabelProps)}
            />
            <CalendarInput
              selected={date}
              onSelect={setDate}
              name="dat"
              placeholder="Data do registro"
              isDisabled={isPending}
            />
          </FormField>
        </div>

        <FormField>
          <Label
            {...({ htmlFor: "desc", children: "Descrição" } as LabelProps)}
          />
          <Textarea
            name="desc"
            placeholder="Descrição do registro"
            defaultValue="Registro de habilidade de comunicação"
            className="resize-y min-h-[100px] max-h-[200px]"
            disabled={isPending}
            required
          />
        </FormField>
      </section>

      {/* Rodapé */}
      <section className="flex gap-2 justify-end">
        <Button
          type="reset"
          variant="outline"
          disabled={isPending}
          onClick={() => window.location.reload()}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Carregando..." : "Criar"}
        </Button>
      </section>

      {result && !isOpenDialog && (
        <div className="space-y-2 my-8">
          <h1 className="text-xl sm:text-2xl">Resultado: </h1>
          <pre className="p-4 bg-[var(--primary-dark)]/10 rounded-lg">
            <code className="text-sm text-muted-foreground">
              {JSON.stringify(result, null, 2)}
            </code>
          </pre>
        </div>
      )}

      {/* Alerta de confirmação */}
      <AlertDialog open={isOpenDialog} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Registro criado com sucesso</AlertDialogTitle>
            <AlertDialogDescription>
              O novo registro foi adicionado corretamente ao sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Fechar</AlertDialogCancel>
            <AlertDialogAction>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Carregamento */}
      {isPending && <Loader />}
    </form>
  );
};

export { Form };

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import logo from "@/assets/logo-small.svg";

interface Error {
  title: string;
  description: React.ReactNode;
}

export default function NotFound() {
  const error = useRouteError();

  let errorMessage: Error;

  const errorStatus: Record<number, Error> = {
    401: {
      title: "Não autorizado",
      description: (
        <p className="text-muted-foreground text-center text-sm">
          Você não está autenticado.{" "}
          <Link to="/entrar" className="text-primary underline">
            Entrar
          </Link>
        </p>
      ),
    },
    404: {
      title: "Página não encontrada",
      description: (
        <p className="text-muted-foreground text-center text-sm">
          A página que você está tentando acessar não existe ou foi removida.{" "}
          <Link to="/" className="text-primary underline">
            Voltar
          </Link>
        </p>
      ),
    },
    403: {
      title: "Permissão negada",
      description: (
        <p className="text-muted-foreground text-center text-sm">
          Você não tem permissão para acessar essa página.{" "}
          <Link to="/" className="text-primary underline">
            Voltar
          </Link>
        </p>
      ),
    },
    500: {
      title: "Erro interno do servidor",
      description: (
        <p className="text-muted-foreground text-center text-sm">
          Ocorreu um erro inesperadom, tente novamente mais tarde.{" "}
          <Link to="/" className="text-primary underline">
            Voltar
          </Link>
        </p>
      ),
    },
  };

  if (isRouteErrorResponse(error)) {
    errorMessage = error.status
      ? errorStatus[error.status as keyof typeof errorStatus] || error.data
      : // @ts-ignore
        error.error?.message || error.statusText;
  } else {
    errorMessage = errorStatus[500];
  }

  console.error(error);

  return (
    <section className="w-screen h-screen flex flex-col items-center bg-background p-6 md:p-10">
      <div className="flex flex-col w-full m-auto max-w-sm gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <div
            className={`rounded-sm ${
              !open ? "mx-autoa" : "min-w-7"
            } w-7 h-7 p-1 pointer-events-none select-none bg-primary`}
          >
            <img src={logo} className="select-none w-full h-full" />
          </div>
          <span className="text-xl font-bold text-primary text-nowrap">
            SISCORP
          </span>
        </div>
        <div className={"flex flex-col gap-6"}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-lg">{errorMessage.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-2">{errorMessage.description}</div>
              </div>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
            Sistema corporativo da INFRA S.A.
            <br />
            <a href="https://infrasa.gov.br">Site oficial</a> e{" "}
            <a href="#">Intranet</a>.
          </div>
        </div>
      </div>
    </section>
  );
}

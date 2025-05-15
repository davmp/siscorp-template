import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  infraLogoSmall,
  siscorpLogo,
} from "siscorp-ui";
import { Link, type ErrorComponentProps } from "@tanstack/react-router";
import type { ErrorStatus } from "types/error.type";

const path = import.meta.env.VITE_APPLICATION_PATH;

export default function Error({ error }: ErrorComponentProps) {
  console.error(error);

  const errorStatus: Record<string, ErrorStatus> = {
    "401": {
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
    "403": {
      title: "Permissão negada",
      description: (
        <p className="text-muted-foreground text-center text-sm">
          Você não tem permissão para acessar essa página.{" "}
          <Link to={path} className="text-primary underline">
            Voltar
          </Link>
        </p>
      ),
    },
    "404": {
      title: "Página não encontrada",
      description: (
        <p className="text-muted-foreground text-center text-sm">
          A página que você está tentando acessar não existe ou foi removida.{" "}
          <Link to={path} className="text-primary underline">
            Voltar
          </Link>
        </p>
      ),
    },
    InternalError: {
      title: "Erro interno do servidor",
      description: (
        <p className="text-muted-foreground text-center text-sm">
          Ocorreu um erro inesperado, tente novamente mais tarde.{" "}
          <Link to={path} className="text-primary underline">
            Voltar
          </Link>
        </p>
      ),
    },
  };

  let message: ErrorStatus | undefined = undefined;

  if (error) {
    const messageParts = error.message.split(":");

    if (messageParts.length > 1) {
      const [errorCode] = messageParts;
      const errorCodeNumber = parseInt(errorCode, 10);

      if (!isNaN(errorCodeNumber)) {
        message = errorStatus[errorCodeNumber.toString()];
      }
    } else if (Object.keys(errorStatus).includes(error.name)) {
      message = errorStatus[error.name as keyof typeof errorStatus];
    }
  }

  if (!message) {
    message = errorStatus.InternalError;
  }

  return (
    <section className="m-auto flex flex-col items-center bg-[var(--background)] p-6 md:p-10">
      <div className="flex flex-col w-full m-auto max-w-sm gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <div
            className={`rounded-sm ${
              !open ? "mx-autoa" : "min-w-7"
            } w-7 h-7 p-1 pointer-events-none select-none bg-primary`}
          >
            <img src={infraLogoSmall} className="select-none w-full h-full" />
          </div>
          <img src={siscorpLogo} className="h-6" />
        </div>
        <div className={"flex flex-col gap-6"}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-lg">{message?.title}</CardTitle>
            </CardHeader>
            <CardContent>{message?.description}</CardContent>
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

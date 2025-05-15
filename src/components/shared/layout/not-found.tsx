import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  infraLogoSmall,
  siscorpLogo,
} from "siscorp-ui";
import { Link, type NotFoundRouteProps } from "@tanstack/react-router";

const path = import.meta.env.VITE_APPLICATION_PATH;

export default function NotFound({ data }: NotFoundRouteProps) {
  data && console.error(data);

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
              <CardTitle className="text-lg">Página não encontrada</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center text-sm">
                A página que você está tentando acessar não existe ou foi
                removida.{" "}
                <Link to={path} className="text-primary underline">
                  Voltar
                </Link>
              </p>
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

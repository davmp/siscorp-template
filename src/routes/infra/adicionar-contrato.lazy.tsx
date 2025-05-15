import { Form } from "components/modules/adicionar-contrato";
import { usePage } from "hooks/page/use-page";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/infra/adicionar-contrato")({
  component: RouteComponent,
});

function RouteComponent() {
  const { title } = usePage(Route);

  return (
    <section className="m-auto flex flex-col gap-6 pb-6">
      <h1 className="text-3xl sm:text-4xl">{title}</h1>
      <section className="m-auto w-full max-w-2xl h-fit pt-6 sm:pt-10 pb-3 gap-3">
        <Form />
      </section>
    </section>
  );
}

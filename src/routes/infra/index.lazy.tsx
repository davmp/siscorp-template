import { createLazyFileRoute } from "@tanstack/react-router";
import { usePage } from "hooks/page/use-page";
import type { Page } from "types/page.type";

import { Card } from "components/modules/infra/index";

export const Route = createLazyFileRoute("/infra/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { title, children } = usePage(Route);

  return (
    <section className="m-auto flex flex-col gap-6 pb-6">
      <h1 className="text-3xl sm:text-4xl">{title}</h1>
      <section className="m-auto w-full max-w-4xl h-fit pt-6 sm:pt-10 pb-3 gap-3 grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 justify-content-center">
        {children?.map((page: Page) => <Card page={page} key={page.path} />)}
      </section>
    </section>
  );
}

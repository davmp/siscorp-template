import type { Page } from "@/types";
import { pages } from "@/providers/pages";
import Card from "./components/module-card";

export default function index() {
  const children = pages.find((page) => page.path === "/module")?.children;

  return (
    <section className="m-auto flex flex-col">
      <h1 className="text-3xl sm:text-4xl">PCA</h1>
      <section className="m-auto w-full max-w-4xl h-fit pt-6 sm:pt-10 pb-3 gap-3 grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 justify-content-center">
        {children?.map((page: Page) => (
          <Card card={page} key={page.path} />
        ))}
      </section>
    </section>
  );
}

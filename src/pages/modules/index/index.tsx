import { Card } from "./components";
import { pages } from "@/providers/pages";
import type { Page } from "@/types/page";

const title = import.meta.env.VITE_APPLICATION_NAME;
const path = import.meta.env.VITE_APPLICATION_PATH;

export default function index() {
  const children = pages.find((page) => page.path === path)?.children;

  return (
    <section className="mx-auto flex flex-col gap-6 pb-6">
      <h1 className="text-3xl sm:text-4xl">{title}</h1>
      <section className="m-auto w-full max-w-4xl h-fit pt-6 sm:pt-10 pb-3 gap-3 grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 justify-content-center">
        {children?.map((page: Page) => (
          <Card page={page} key={page.path} />
        ))}
      </section>{" "}
    </section>
  );
}

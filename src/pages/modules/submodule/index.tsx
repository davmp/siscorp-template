import { Form } from "./components";

export default function index() {
  return (
    <section className="m-auto flex flex-col">
      <h1 className="text-3xl sm:text-4xl">Submódulo</h1>
      <section className="m-auto w-full max-w-2xl h-fit pt-6 sm:pt-10 pb-3 gap-3">
        <Form />
      </section>
    </section>
  );
}

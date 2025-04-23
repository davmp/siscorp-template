import React from "react";

export function PageError({
  title,
  error,
}: {
  title?: string;
  error?: React.ReactNode;
}) {
  return (
    <section className="h-full grid place-items-center">
      <div className="flex flex-col gap-4 items-center justify-center -mt-10">
        <h1 className="text-3xl md:text-4xl">{title || "Ocorreu um erro"}</h1>
        <div>
          {error || (
            <p className="text-muted-foreground">
              Ocorreu um erro inesperado. Tente novamente mais tarde.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

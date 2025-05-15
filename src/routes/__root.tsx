import { Fragment } from "react";
import { createRootRoute } from "@tanstack/react-router";
import { useIsMobile, TooltipProvider, Loader, Toaster } from "siscorp-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "components/shared/layout/layout";

export const Route = createRootRoute({
  component: RootComponent,
  pendingComponent: Loader,
});

const queryClient = new QueryClient({
  defaultOptions: {},
});

function RootComponent() {
  const isMobile = useIsMobile();

  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Layout />
        </TooltipProvider>
      </QueryClientProvider>
      <Toaster
        toastOptions={{
          className:
            "bg-card text-card-foreground gap-6 rounded-xl border !border-[#c6cedb] py-6 shadow-sm",
        }}
        position={isMobile ? "top-center" : "bottom-right"}
        richColors
      />
    </Fragment>
  );
}

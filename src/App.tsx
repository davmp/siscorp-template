import router from "./providers/routes/router";
import { Fragment } from "react/jsx-runtime";
import { RouterProvider } from "react-router-dom";
import { TooltipProvider, Toaster, useIsMobile } from "siscorp-ui";
import { AuthProvider } from "./providers/auth/auth-provider";

export default function App() {
  const isMobile = useIsMobile();

  return (
    <Fragment>
      <AuthProvider>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </AuthProvider>
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

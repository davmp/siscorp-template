import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { routes } from ".";
import { Loader } from "siscorp-ui";

const Layout = lazy(() => import("@/pages/layout/layout"));
const NotFound = lazy(() => import("@/pages/layout/not-found"));

const withSuspense = (Component: React.LazyExoticComponent<any>) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

const path = import.meta.env.VITE_APPLICATION_PATH;

const router = createBrowserRouter([
  {
    path,
    element: <Layout />,
    errorElement: withSuspense(NotFound),
    children: [...routes({ withSuspense })],
  },
]);

export default router;

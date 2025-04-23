import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { routes } from ".";
import Loader from "@/components/ui/loader";

const Layout = lazy(() => import("@/pages/layout/layout"));
const NotFound = lazy(() => import("@/pages/layout/not-found"));

const withSuspense = (Component: React.LazyExoticComponent<any>) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: withSuspense(NotFound),
    children: [...routes({ withSuspense })],
  },
]);

export default router;

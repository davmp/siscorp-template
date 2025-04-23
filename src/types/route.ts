import type { JSX } from "react";

export type RoutesProps = {
  withSuspense: (Component: React.LazyExoticComponent<any>) => JSX.Element;
};

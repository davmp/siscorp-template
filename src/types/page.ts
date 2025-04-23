import type { JSXElementConstructor, LazyExoticComponent } from "react";

export interface Page {
  path?: string;
  title: string;
  name?: string;
  avoid?: true;
  icon: JSXElementConstructor<any>;
  element?: LazyExoticComponent<any>;
  description?: string;
  children?: Page[];
}

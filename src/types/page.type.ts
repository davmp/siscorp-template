import type { JSXElementConstructor } from "react";

export interface Page {
  path?: string;
  title: string;
  name?: string;
  description?: string;
  icon: JSXElementConstructor<any>;
  children?: Page[];
}

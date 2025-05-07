import type { JSXElementConstructor, LazyExoticComponent } from "react";

export type Page = IndexPage | NonIndexPage;

interface IndexPage {
  index: true;
  path?: string;
  title: string;
  name?: string;
  avoid?: true;
  icon: JSXElementConstructor<any>;
  element?: LazyExoticComponent<any>;
  description?: string;
  children?: Page[];
}

interface NonIndexPage {
  index?: false;
  path: string;
  title: string;
  name?: string;
  avoid?: true;
  icon: JSXElementConstructor<any>;
  element?: LazyExoticComponent<any>;
  description?: string;
  children?: Page[];
}

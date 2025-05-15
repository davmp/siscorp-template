import { SidebarProvider } from "siscorp-ui";
import { Outlet } from "@tanstack/react-router";
import { Header, Sidebar } from "components/shared/navigation";

export default function Layout() {
  return (
    <SidebarProvider
      style={{
        //@ts-ignore
        "--sidebar-width": "var(--sidebar-width_)",
        "--sidebar-width-mobile": "var(--sidebar-width-mobile_)",
      }}
      defaultOpen={false}
    >
      <Sidebar />
      <main className="w-full h-full min-h-screen @container">
        <Header />
        <section className="h-full relative pt-4 px-4 sm:px-10">
          <Outlet />
        </section>
      </main>
    </SidebarProvider>
  );
}

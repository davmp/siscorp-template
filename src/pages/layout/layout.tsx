import Sidebar from "@/components/navigation/sidebar/sidebar";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "siscorp-ui";
import { Header } from "@/components/navigation";

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

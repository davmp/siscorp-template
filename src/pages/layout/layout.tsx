import Sidebar from "@/components/navigation/sidebar/sidebar";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/navigation";

export default function Layout() {
  // const { isAuthenticated } = useAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  // if (!isAuthenticated) {
  //   navigate("/entrar", {
  //     state: { from: window.location.pathname },
  //   });
  // }
  // }, [isAuthenticated, navigate]);

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

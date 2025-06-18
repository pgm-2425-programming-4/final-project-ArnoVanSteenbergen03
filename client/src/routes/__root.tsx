import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navigation from "../components/Navigation";
import "../App.css";

export const Route = createRootRoute({
  component: function RootLayout() {
    return (
      <main className="content">
        <Navigation />
        <Outlet />
        <TanStackRouterDevtools />
      </main>
    );
  },
});

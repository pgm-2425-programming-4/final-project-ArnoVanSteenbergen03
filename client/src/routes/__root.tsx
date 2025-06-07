import { createRootRoute, Outlet } from "@tanstack/react-router";
import Navigation from "../components/Navigation";
import "../App.css";

export const Route = createRootRoute({
  component: function RootLayout() {
    return (
      <main className="content">
        <Navigation />
        <Outlet />
      </main>
    );
  },
});

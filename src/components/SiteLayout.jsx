import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import FloatingOrderButton from "./FloatingOrderButton.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";

export default function SiteLayout() {
  const { config } = useSiteConfig();

  return (
    <div
      className="min-h-full"
      data-theme={config.theme.preset}
      style={{ ["--radius"]: `${config.theme.radius}px` }}
    >
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
      {config.layout.showFloatingOrderButton ? <FloatingOrderButton /> : null}
    </div>
  );
}

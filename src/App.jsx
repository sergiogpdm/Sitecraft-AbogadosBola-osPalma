import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SiteLayout from "./components/SiteLayout.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Contact from "./pages/Contact.jsx";
import Customize from "./pages/Customize.jsx";
import NotFound from "./pages/NotFound.jsx";
import { useSiteConfig } from "./context/SiteConfigContext.jsx";

function CustomizeGuard({ children }) {
  const { config } = useSiteConfig();
  return config.pages.customize?.enabled ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/carta" element={<Menu />} />
          <Route path="/contacto" element={<Contact />} />
          <Route
            path="/customize"
            element={
              <CustomizeGuard>
                <Customize />
              </CustomizeGuard>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

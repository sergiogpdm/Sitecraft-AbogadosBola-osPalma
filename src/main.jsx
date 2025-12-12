import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SiteConfigProvider } from "./context/SiteConfigContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SiteConfigProvider>
      <App />
    </SiteConfigProvider>
  </React.StrictMode>
);

import { createContext, useContext, useMemo, useState } from "react";
import { siteConfig as defaultConfig } from "../config/site.config.js";

const SiteConfigCtx = createContext(null);

export function SiteConfigProvider({ children }) {
  const [config, setConfig] = useState(defaultConfig);
  const value = useMemo(() => ({ config, setConfig }), [config]);
  return <SiteConfigCtx.Provider value={value}>{children}</SiteConfigCtx.Provider>;
}

export function useSiteConfig() {
  const v = useContext(SiteConfigCtx);
  if (!v) throw new Error("useSiteConfig must be used within SiteConfigProvider");
  return v;
}

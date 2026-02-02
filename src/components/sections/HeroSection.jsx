import { useSiteConfig } from "../../context/SiteConfigContext.jsx";
import { getHeroVariantComponent } from "./hero/heroVariants.js";

export default function HeroSection({ data, preview = false }) {
  const { config } = useSiteConfig();
  const hero = data ?? config?.copy?.hero;
  if (!hero) return null;

  const Variant = getHeroVariantComponent(hero.variant);

  return (
    <div
      style={{
        "--heroText": hero?.textColor || "",
        "--heroMuted": hero?.mutedColor || "",
        "--heroAccentA": hero?.highlightA || "",
        "--heroAccentB": hero?.highlightB || "",
      }}
      className="text-[color:var(--heroText,var(--text))]"
    >
      <Variant data={hero} preview={preview} />
    </div>
  );
}

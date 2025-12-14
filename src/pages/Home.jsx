import HeroSection from "../components/sections/HeroSection.jsx";
import BenefitsSection from "../components/sections/BenefitsSection.jsx";
import BestSellersSection from "../components/sections/BestSellersSection.jsx";
import PromoCtaSection from "../components/sections/PromoCtaSection.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";

const SECTION_MAP = {
  hero: HeroSection,
  benefits: BenefitsSection,
  bestSellers: BestSellersSection,

  // Soporta ambas keys por si en config usas una u otra
  promoCta: PromoCtaSection,
  promo: PromoCtaSection,
};

export default function Home() {
  const { config } = useSiteConfig();
  const sections = config?.pages?.home?.sections || [];

  return (
    <div>
      {sections
        .filter((s) => s?.enabled)
        .map((s) => {
          const Comp = SECTION_MAP[s?.id];
          if (!Comp) return null;
          return <Comp key={s.id} />;
        })}
    </div>
  );
}

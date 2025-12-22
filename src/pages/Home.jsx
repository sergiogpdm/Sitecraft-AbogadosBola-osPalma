import HeroSection from "../components/sections/HeroSection.jsx";
import BenefitsSection from "../components/sections/BenefitsSection.jsx";
import BestSellersSection from "../components/sections/BestSellersSection.jsx";
import PromoCtaSection from "../components/sections/PromoCtaSection.jsx";
import GallerySection from "../components/sections/GallerySection.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";

const SECTION_MAP = {
  hero: HeroSection,
  benefits: BenefitsSection,
  bestSellers: BestSellersSection,
  gallery: GallerySection,

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

          // Si algún componente necesita data explícita, lo pasamos aquí
          if (s.id === "gallery") return <Comp key={s.id} data={config.copy.gallery} />;
          if (s.id === "hero") return <Comp key={s.id} data={config.copy.hero} />;
          if (s.id === "benefits") return <Comp key={s.id} data={config.copy.benefits} />;
          if (s.id === "bestSellers") return <Comp key={s.id} data={config.copy.bestSellers} />;
          if (s.id === "promo" || s.id === "promoCta") return <Comp key={s.id} data={config.copy.promo} />;

          return <Comp key={s.id} />;
        })}
    </div>
  );
}

import HeroSection from "../components/sections/HeroSection.jsx";
import BenefitsSection from "../components/sections/BenefitsSection.jsx";
import BestSellersSection from "../components/sections/BestSellersSection.jsx";
import PromoCtaSection from "../components/sections/PromoCtaSection.jsx";
import GallerySection from "../components/sections/GallerySection.jsx";

// ✅ NUEVOS
import CountdownSection from "../components/sections/CountdownSection.jsx";
import ItinerarySection from "../components/sections/ItinerarySection.jsx";

import { useSiteConfig } from "../context/SiteConfigContext.jsx";

const SECTION_MAP = {
  hero: HeroSection,
  benefits: BenefitsSection,
  bestSellers: BestSellersSection,
  gallery: GallerySection,

  // ✅ NUEVOS
  countdown: CountdownSection,
  itinerary: ItinerarySection,

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

          // Pasar data explícita
          if (s.id === "gallery") return <Comp key={s.id} data={config.copy.gallery} />;
          if (s.id === "hero") return <Comp key={s.id} data={config.copy.hero} />;
          if (s.id === "benefits") return <Comp key={s.id} data={config.copy.benefits} />;
          if (s.id === "bestSellers") return <Comp key={s.id} data={config.copy.bestSellers} />;
          if (s.id === "promo" || s.id === "promoCta") return <Comp key={s.id} data={config.copy.promo} />;

          // ✅ NUEVOS: data para countdown e itinerary
          if (s.id === "countdown") return <Comp key={s.id} data={config.copy.countdown} />;
          if (s.id === "itinerary") return <Comp key={s.id} data={config.copy.itinerary} />;

          return <Comp key={s.id} />;
        })}
    </div>
  );
}

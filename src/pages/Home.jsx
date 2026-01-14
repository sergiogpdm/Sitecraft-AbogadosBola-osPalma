import HeroSection from "../components/sections/HeroSection.jsx";
import BenefitsSection from "../components/sections/BenefitsSection.jsx";
import BestSellersSection from "../components/sections/BestSellersSection.jsx";
import PromoCtaSection from "../components/sections/PromoCtaSection.jsx";
import GallerySection from "../components/sections/GallerySection.jsx";

// ✅ YA TENÍAS
import CountdownSection from "../components/sections/CountdownSection.jsx";
import ItinerarySection from "../components/sections/ItinerarySection.jsx";

// ✅ NUEVOS (para que no quede sosa)
import PhotoStripSection from "../components/sections/PhotoStripSection.jsx";
import StorySection from "../components/sections/StorySection.jsx";

import { useSiteConfig } from "../context/SiteConfigContext.jsx";

const SECTION_MAP = {
  hero: HeroSection,
  benefits: BenefitsSection,
  bestSellers: BestSellersSection,
  gallery: GallerySection,

  // Soporta ambas keys por si en config usas una u otra
  promoCta: PromoCtaSection,
  promo: PromoCtaSection,

  // ✅ BODA
  countdown: CountdownSection,
  itinerary: ItinerarySection,
  photoStrip: PhotoStripSection,
  story: StorySection,
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

          // Pasar data explícita (centralizado)
          const dataMap = {
            hero: config.copy?.hero,
            benefits: config.copy?.benefits,
            bestSellers: config.copy?.bestSellers,
            gallery: config.copy?.gallery,
            promo: config.copy?.promo,
            promoCta: config.copy?.promo,

            // ✅ nuevos
            countdown: config.copy?.countdown,
            itinerary: config.copy?.itinerary,
            photoStrip: config.copy?.photoStrip,
            story: config.copy?.story,
          };

          const data = dataMap[s.id];

          // Si existe data, la pasamos. Si no, render normal.
          return data ? <Comp key={s.id} data={data} /> : <Comp key={s.id} />;
        })}
    </div>
  );
}

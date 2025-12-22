import { useMemo, useRef } from "react";
import Container from "../Container.jsx";
import GlassCard from "../GlassCard.jsx";
import SectionTitle from "../SectionTitle.jsx";
import Button from "../ui/Button.jsx";
import { useSiteConfig } from "../../context/SiteConfigContext.jsx";

/* Fallback por si no existe en config */
const DEFAULT_GALLERY = {
  enabled: true,
  kicker: "Galería",
  title: "Galería",
  desc: "Imágenes del espacio, ambiente o producto.",
  items: [],
};

export default function GallerySection({ data, preview = false }) {
  const { config } = useSiteConfig();

  const g =
    data ||
    config?.copy?.gallery ||
    DEFAULT_GALLERY;

  if (g.enabled === false) return null;

  const kicker = g.kicker || DEFAULT_GALLERY.kicker;
  const title = g.title || DEFAULT_GALLERY.title;
  const desc = g.desc || DEFAULT_GALLERY.desc;

  const items = useMemo(
    () => (Array.isArray(g.items) ? g.items : []),
    [g.items]
  );

  const scrollerRef = useRef(null);

  const scrollByCards = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(260, Math.floor(el.clientWidth * 0.85));
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section id="gallery" className="py-16 sm:py-20">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <SectionTitle kicker={kicker} title={title} desc={desc} />

          {items.length > 1 ? (
            <div className="hidden sm:flex gap-2">
              <Button variant="default" onClick={() => scrollByCards(-1)}>←</Button>
              <Button variant="default" onClick={() => scrollByCards(1)}>→</Button>
            </div>
          ) : null}
        </div>

        <div className="mt-8">
          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {items.length ? (
              items.map((it, idx) => (
                <GalleryCard key={`gallery-${idx}`} item={it} />
              ))
            ) : (
              <GlassCard className="p-8 text-sm text-[var(--muted)]">
                No hay imágenes todavía. Añádelas desde Customize → Gallery.
              </GlassCard>
            )}
          </div>

          {items.length > 1 ? (
            <div className="mt-4 flex sm:hidden gap-2">
              <Button variant="default" onClick={() => scrollByCards(-1)} className="w-full">
                ← Anterior
              </Button>
              <Button variant="default" onClick={() => scrollByCards(1)} className="w-full">
                Siguiente →
              </Button>
            </div>
          ) : null}

          {preview ? (
            <div className="mt-4 text-xs text-[var(--muted)]">
              Tip: arrastra horizontalmente para ver las imágenes.
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Card ---------- */

function GalleryCard({ item }) {
  const src = item?.imageSrc || "";
  const caption = item?.caption || "";
  const alt = item?.alt || "Imagen";

  return (
    <div
      className="shrink-0"
      style={{
        width: "min(420px, 86vw)",
        scrollSnapAlign: "start",
      }}
    >
      <GlassCard className="overflow-hidden">
        <div className="relative aspect-[16/10] w-full border-b border-[var(--border)] bg-[var(--card)]">
          {src ? (
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full grid place-items-center text-xs text-[var(--muted)]">
              Sin imagen
            </div>
          )}

          {/* overlay suave */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.55) 100%)",
            }}
          />
        </div>

        <div className="p-4">
          {caption ? (
            <div className="text-sm font-semibold text-[var(--text)]">
              {caption}
            </div>
          ) : (
            <div className="text-xs text-[var(--muted)]">—</div>
          )}
        </div>
      </GlassCard>
    </div>
  );
}

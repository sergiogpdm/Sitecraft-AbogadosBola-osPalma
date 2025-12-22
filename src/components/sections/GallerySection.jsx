import { useMemo, useRef } from "react";
import Container from "../Container.jsx";
import GlassCard from "../GlassCard.jsx";
import SectionTitle from "../SectionTitle.jsx";
import { useSiteConfig } from "../../context/SiteConfigContext.jsx";

const DEFAULT_GALLERY = {
  enabled: true,
  kicker: "Galería",
  title: "Galería",
  desc: "Imágenes del espacio, ambiente o producto.",
  items: [],
};

export default function GallerySection({ data, preview = false }) {
  const { config } = useSiteConfig();

  const g = data || config?.copy?.gallery || DEFAULT_GALLERY;
  if (g.enabled === false) return null;

  const kicker = g.kicker || DEFAULT_GALLERY.kicker;
  const title = g.title || DEFAULT_GALLERY.title;
  const desc = g.desc || DEFAULT_GALLERY.desc;

  const items = useMemo(() => (Array.isArray(g.items) ? g.items : []), [g.items]);

  const scrollerRef = useRef(null);

  const scrollByOneCard = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;

    const first = el.querySelector("[data-gallery-card='true']");
    const cardW = first ? first.getBoundingClientRect().width : Math.max(320, el.clientWidth * 0.8);
    const gap = 16; // gap-4 ~ 16px
    el.scrollBy({ left: dir * (cardW + gap), behavior: "smooth" });
  };

  return (
    <section id="gallery" className="py-16 sm:py-20">
      {/* Header alineado al resto */}
      <Container>
        <SectionTitle kicker={kicker} title={title} desc={desc} />
      </Container>

      {/* Zona full-bleed SOLO para el carrusel */}
      <div className="mt-10">
        <div className="mx-[calc(50%-50vw)] w-screen">
          <div className="relative px-4 sm:px-6 lg:px-8">
            {/* Fades laterales */}
            <div
              className="pointer-events-none absolute left-0 top-0 h-full w-12 sm:w-16"
              style={{ background: "linear-gradient(90deg, var(--bg) 0%, rgba(0,0,0,0) 100%)" }}
            />
            <div
              className="pointer-events-none absolute right-0 top-0 h-full w-12 sm:w-16"
              style={{ background: "linear-gradient(270deg, var(--bg) 0%, rgba(0,0,0,0) 100%)" }}
            />

            {/* Botones flotantes (solo desktop) */}
            {items.length > 1 ? (
              <>
                <NavButton side="left" onClick={() => scrollByOneCard(-1)} />
                <NavButton side="right" onClick={() => scrollByOneCard(1)} />
              </>
            ) : null}

            {/* Scroller */}
            <div
              ref={scrollerRef}
              className="gallery-scroller flex gap-4 overflow-x-auto scroll-smooth pb-2"
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-x",
                overscrollBehaviorX: "contain",
              }}
            >
              <style>{`
                #gallery .gallery-scroller::-webkit-scrollbar { display: none; }
              `}</style>

              {items.length ? (
                items.map((it, idx) => (
                  <div
                    key={`gallery-${idx}`}
                    data-gallery-card="true"
                    className="shrink-0"
                    style={{
                      width: "min(720px, 92vw)",
                      scrollSnapAlign: "start",
                      scrollSnapStop: "always",
                    }}
                  >
                    <GalleryCard item={it} />
                  </div>
                ))
              ) : (
                <GlassCard className="p-8 text-sm text-[var(--muted)]">
                  No hay imágenes todavía. Añádelas desde Customize → Gallery.
                </GlassCard>
              )}
            </div>

            {preview ? (
              <div className="mt-4 text-xs text-[var(--muted)]">
                Tip: puedes arrastrar horizontalmente (snap exacto) o usar los botones.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ item }) {
  const src = item?.imageSrc || "";
  const caption = String(item?.caption || "").trim();
  const alt = item?.alt || "Imagen";
  const hasCaption = !!caption;

  return (
    <GlassCard className="group overflow-hidden">
      <div
        className={[
          "relative w-full bg-[var(--card)]",
          hasCaption ? "border-b border-[var(--border)]" : "",
        ].join(" ")}
        style={{
          aspectRatio: hasCaption ? "16 / 10" : "16 / 9",
        }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-xs text-[var(--muted)]">
            Sin imagen
          </div>
        )}

        {/* Overlay SOLO si hay caption */}
        {hasCaption ? (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 58%, rgba(0,0,0,0.62) 100%)",
            }}
          />
        ) : null}
      </div>

      {/* Footer SOLO si hay caption */}
      {hasCaption ? (
        <div className="p-4">
          <div className="text-sm font-semibold text-[var(--text)]">{caption}</div>
        </div>
      ) : null}
    </GlassCard>
  );
}

function NavButton({ side, onClick }) {
  const isLeft = side === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "hidden lg:grid",
        "absolute top-1/2 -translate-y-1/2 z-10",
        isLeft ? "left-4" : "right-4",
        "h-11 w-11 place-items-center rounded-full",
        "border border-[var(--border)] bg-[rgba(11,18,32,0.55)] backdrop-blur-xl",
        "transition-transform duration-200 hover:scale-[1.06] active:scale-[0.98]",
      ].join(" ")}
      style={{
        boxShadow:
          "0 18px 70px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset",
      }}
      aria-label={isLeft ? "Anterior" : "Siguiente"}
    >
      <span
        className="text-lg"
        style={{
          backgroundImage: "linear-gradient(90deg, var(--accentA), var(--accentB))",
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {isLeft ? "‹" : "›"}
      </span>
    </button>
  );
}
